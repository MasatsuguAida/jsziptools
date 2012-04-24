/**
 * Compress and decompress RFC 1950 zlib file format binary data.
 * http://tools.ietf.org/rfc/rfc1950.txt
 */

jz.zlib = jz.zlib || {};

(function(window, jz){

/**
 * Compress to a zlib format buffer.
 * 
 * @param {ArrayBuffer|Uint8Array|Array|string} bytes
 * @param {integer} level compress level.
 * @return {ArrayBuffer} zlib format buffer.
 */
jz.zlib.compress = function(bytes, level){
	var ret, buffer, i, end, checksum, data, view;
	
	//compress to deflate stream
	data = jz.utils.toBytes(jz.algorithms.deflate(bytes, level));
	
	ret = new Uint8Array(data.length + 6);
	view = new DataView(ret.buffer);
	
	//write zlib header
	ret[0] = 0x78;
	ret[1] = 0x01;
	
	//write zlib deflate stream
	ret.set(data, 2);
	
	//write adler32 checksum
	checksum = jz.algorithms.adler32(bytes);
	view.setUint32(ret.length - 4, checksum);
	
	return ret.buffer;
};


/**
 * Decompress from a zlib format buffer.
 * 
 * @param {ArrayBuffer|Uint8Array|Array|string} bytes zlib format buffer.
 * @param {boolean} check if check adler32 checksum, set true.
 * @return {ArrayBuffer} buffer.
 */
jz.zlib.decompress = function(bytes, check){
	var b, cm, cinfo, fcheck, fdict, view,
		flevel, dictid, checksum, ret,
		offset = 0;
	bytes = jz.utils.toBytes(bytes);
	view = DataView.create(bytes);
	
	//read zlib header
	b = bytes[offset++];
	cm = b & 0xF;
	cinfo = b >> 4;
	
	b = bytes[offset++];
	fcheck = b & 0x1F;
	fdict = b & 0x20;
	flevel = b >> 6;
	
	if(fdict){
		dictid = view.getUint32(offset);
		offset += 4;
	}
	
	//decompress from deflate stream
	ret = jz.algorithms.inflate(bytes.subarray(offset, bytes.length - 4));
	
	//check adler32
	if(check){
		//read adler32 checksum
		checksum = view.getUint32(bytes.length - 4, false);
		checksum2 = jz.algorithms.adler32(ret);
		if(checksum !== checksum2) throw 'Error: differ from checksum';
	}
	
	return ret;
};

})(this, jz);