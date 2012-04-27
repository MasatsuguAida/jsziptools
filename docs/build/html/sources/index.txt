.. jsziptools documentation master file, created by
   sphinx-quickstart on Mon Apr 23 03:03:32 2012.
   You can adapt this file completely to your liking, but it should at least
   contain the root `toctree` directive.

JSZIPTOOLS API REFERENCE
========================

.. `jsziptools <https://github.com/ukyo/jsziptools>`_ のAPIリファレンスです。

This documnentation explaines all API of `jsziptools <https://github.com/ukyo/jsziptools>`_

`Japanese <index_jp.html>`_

jz.algorithms
-------------

.. `RFC 1951 <http://tools.ietf.org/html/rfc1951>`_ で定義されているdeflateの圧縮、伸張(とデータのチェック)の実装です。
	jz.zlib_ , jz.gz_ , jz.zip_ で使用されます。
	もちろんこれらの関数を直接使用することもできます( ``indexDB`` , ``webstorage`` に保存するときに有効かもしれません)。

jz.algorithms_ are implementations of deflate compression algorithm is defined in `RFC 1951 <http://tools.ietf.org/html/rfc1951>`_
and adler32 and crc32 check sum algorithms.
jz.zlib_ , jz.gz_ and jz.zip_ use these functions.
Ofcourse you can use these functions directry.

.. .. note::

   deflateは `zlib <http://www.zlib.net/>`_ を `emscripten <https://github.com/kripken/emscripten>`_
   で変換したものを使用しています。
   inflateは `pdf.js <https://github.com/mozilla/pdf.js>`_ のものを使用しています。

.. node::

   deflate is ported from `zlib <http://www.zlib.net/>`_ using `emscripten <https://github.com/kripken/emscripten>`_ .
   inflate is ported from `pdf.js <https://github.com/mozilla/pdf.js>`_ .

jz.algorithms.adler32
~~~~~~~~~~~~~~~~~~~~~

.. 圧縮前のバイト列からadler32チェックサムを計算します。

Calculate adler32 check sum.


.. .. js:function:: jz.algorithms.adler32(bytes)

   :param ArrayBuffer|Uint8Array|Array|string bytes: 圧縮前のバイト列
   :returns: number of adler32 checksum

.. js:function:: jz.algorithms.adler32(bytes)

   :param ArrayBuffer|Uint8Array|Array|string bytes: Byte sequence
   :returns: number of adler32 checksum

jz.algorithms.crc32
~~~~~~~~~~~~~~~~~~~

.. 圧縮前のバイト列からcrc32チェックサムを計算します。

Calculate crc32 check sum.

.. js:function:: jz.algorithms.crc32(bytes)

   :param ArrayBuffer|Uint8Array bytes: Byte sequence
   :returns: number of crc32 checksum

jz.algorithms.deflate
~~~~~~~~~~~~~~~~~~~~~

.. js:function:: jz.algorithms.deflate(bytes[, level])

   :param ArrayBuffer|Uint8Array|Array|string bytes: Byte sequence
   :param number level: Compression level.
                        Default value is 6.
                        Range is from 0(no compression) to 9.
   :returns: Return a compressed data as ``ArrayBuffer`` .

jz.algorithms.inflate
~~~~~~~~~~~~~~~~~~~~~

.. js:function:: jz.algorithms.inflate(bytes)

   :param ArrayBuffer|Uint8Array|Array|string bytes: Byte sequence
   :returns: Return a decompressed data as ``ArrayBuffer`` .

jz.zlib
-------

.. `RFC 1950 <http://tools.ietf.org/html/rfc1950>`_ で定義されているzlib形式でファイルを圧縮、伸張します。
	内部的にzlibを使用しているものはたくさんあるので(swf,pngなど)、けっこう重宝します。

jz.zlib_ compress or decompress Zlib compression format files are defined in `RFC 1950 <http://tools.ietf.org/html/rfc1950>`_ .

jz.zlib.compress
~~~~~~~~~~~~~~~~

.. js:function:: jz.zlib.compress(bytes[, level])

   :param ArrayBuffer|Uint8Array|Array|string bytes: Byte sequence
   :param number level: Compression level.
                        Default value is 6.
                        Range is from 0(no compression) to 9.
   :returns: Return a compressed data as ``ArrayBuffer`` .

jz.zlib.decompress
~~~~~~~~~~~~~~~~~~

.. js:function:: jz.zlib.decompress(bytes[, check])

   :param ArrayBuffer|Uint8Array|Array|string bytes: Byte sequence
   :param boolean check: Validate adler32 checksum if check is true.
   Defalt value is false.
   :returns: Return a decompressed data as ``ArrayBuffer`` .

jz.gz
-----

.. `RFC 1952 <http://tools.ietf.org/html/rfc1952>`_ で定義されているgzip形式のファイルの圧縮、伸張を行います。
    クライアントでgzip圧縮をしてサーバの負荷を減らすというのもありかもしれません(処理時間は巨大なファイルでもなければ無視できるレベル)。

jz.zlib_ compress or decompress gzip compression format files are defined in `RFC 1952 <http://tools.ietf.org/html/rfc1952>`_ .

Example:

.. code-block:: javascript

   var xhr = new XMLHttpRequest;
   xhr.open('POST', '/upload', true);
   
   //compress and send.
   xhr.send(jz.gz.compress(buffer, 9));
   
jz.gz.compress
~~~~~~~~~~~~~~

.. js:function:: jz.gz.compress(bytes[, level])

   :param ArrayBuffer|Uint8Array|Array|string bytes: Byte sequence
   :param number level: Compression level.
                        Default value is 6.
                        Range is from 0(no compression) to 9.
   :returns: Return a compressed data as ``ArrayBuffer`` .


jz.gz.decompress
~~~~~~~~~~~~~~~~

.. js:function:: jz.gz.decompress(bytes[, check])

   :param ArrayBuffer|Uint8Array|Array|string bytes: Byte sequence
   :param boolean check: Validate crc32 checksum if check is true.
                         Defalt value is false.
   :returns: Return a decompressed data as ``ArrayBuffer`` .

jz.zip
------

.. zip形式のファイルの圧縮、伸張を行います。

jz.zip_ pack or unpack zip format archive files.

jz.zip.pack
~~~~~~~~~~~

.. files_ で表現されるディレクトリ構造を同期的、非同期的にzip形式のアーカイブに変換します。

Convert a directory structure is represented in files_ to a zip format archive
synchronously of asynchronously.

.. js:function:: jz.zip.pack(params)

   :param Object params: Refer to params_ .
   :returns: Return a data is archived ``ArrayBuffer`` as if you want to run synchronously.

Example:

.. code-block:: javascript

   //synchronous
   var packedSync = jz.zip.pack({
     files: files,
     level: 8
   });
   
   //asynchronous: run asynchronously if you set "complete" to params_ .
   jz.zip.pack({
     files: files,
     level: 8,
     complete: function(packed){
       //do something.
     }
   });

.. Ajaxでファイルを読み込む必要がない場合は、同期的に処理しても問題ないでしょう。
	Ajaxで読み込む場合は非同期的に処理することをお勧めします(最近Firefoxあたりで同期読み込みができない)。


params
``````

files
   Refer to files_ .
level
   Compression level.
   Default value is 6.
   Range is from 0(no compression) to 9.
complete
   Callback function.
   This function receive an argument is ``ArrayBuffer`` .
   Run synchronously if you don't set.

files
`````

.. JSON形式でディレクトリ構造を表現します。
	各要素はファイル名を表す ``name`` と種類に応じたプロパティを持っています。
	ルートは配列です。

Files or directories are represented in JSON.
Files or directories have a ``name`` property repesent filename.
Files hava a ``str`` , ``url`` or ``buffer`` property.
Directories have a ``dir`` , ``children`` , ``folder`` (Refer to bottom text).
Root directory isn't Object. Use Array.

str
   Use string as text file's string.
url
   Load from target URL.
buffer
   Use ``ArrayBuffer`` , ``Uint8Array`` , ``Array`` .
dir,children,folder
   Use Array and represent directory structure.

.. さらに、各要素ごとに圧縮レベルを設定することができます。
	``level`` というプロパティを作り、0〜9までの圧縮レベルを指定してください。
	ここで設定した圧縮レベルは params_ で設定したものより優先的に使用されます。
	設定しない場合は、 params_ で設定したものが使用されます。

Furthermore, you can set ``level`` property to Files.
This compression level is used in preference than params_.level.

Example:

.. code-block:: javascript

   var files = [
     {name: 'hello.txt', str: 'hello world!'},
     {name: 'dog.png', url: './image/dog.png'},
     {name: 'hoge.wav', buffer: wavbuff, level: 9},
     {name: 'sub', dir: [
       {name: 'subsub', dir: [
         {name: 'fuga.txt', str: 'fuga'}
       ]}
     ]}
   ];

jz.zip.unpack
~~~~~~~~~~~~~

.. js:function:: jz.zip.unpack(buffer)

   :param ArrayBuffer buffer: zip format archive
   :returns: Return a instance of jz.zip.LazyLoader_

jz.zip.LazyLoader
~~~~~~~~~~~~~~~~~

.. jz.zip.unpack_ ではいきなり全てを伸張せずに、
	遅延ロード(でいいんだっけ?)するための jz.zip.LazyLoader_ クラスを提供します。
	suffixにSyncがつくメソッドはworker内だけで有効になります。

jz.zip.unpack_ doesn't unpack all files at first.
jz.zip.LazyLoader.prototype.getFileXXX load files lazy.
You can use methods have 'Sync' suffix in the worker.

.. js:function:: jz.zip.LazyLoader.prototype.getFileNames

   :returns: Return Array of file path.

.. js:function:: jz.zip.LazyLoader.prototype.getFileAsArrayBuffer(filename)

   :param string filename: File path
   :returns: Return a unpacked file data as ``ArrayBuffer`` .
    
.. js:function:: jz.zip.LazyLoader.prototype.getFileAsText(filename[, encoding], callback)

   :param string filename: File path
   :param string encoding: Text encoding. Default value is "UTF-8".
   :param function callback: Callback function。This function receive an argument is ``String`` .
   
   
.. js:function:: jz.zip.LazyLoader.prototype.getFileAsBlob(filename[, contentType])

   :param string filename: File path
   :param string contentType: Content type. set automatically if you don't set.
   :returns: Return a unpacked file data as ``Blob`` .

.. js:function:: jz.zip.LazyLoader.prototype.getFileAsBinaryString(filename, callback)

   :param string filename: File path
   :param function callback: Callback function。This function receive an argument is ``String`` (Binary String).
   
.. js:function:: jz.zip.LazyLoader.prototype.getFileAsDataURL(filename, callback)

   :param string filename: File path
   :param function callback: Callback function。This function receive an argument is ``String`` (Data URL).
   
.. js:function:: jz.zip.LazyLoader.prototype.getFileAsTextSync(filename[, encoding])

   :param string filename: File path
   :param string encoding: Text encoding. Default value is "UTF-8".
   :returns: Return a unpacked file data as ``String`` .
   
.. js:function:: jz.zip.LazyLoader.prototype.getFileAsBinaryStringSync(filename)

   :param string filename: File path
   :returns: Return a unpacked file data as ``String`` (Binary String).
   
.. js:function:: jz.zip.LazyLoader.prototype.getFileAsDataURLSync(filename)

   :param string filename: File path
   :returns: Return a unpacked file data as ``String`` (Data URL).

Example:

.. code-block:: javascript

   //create zip
   var packed = jz.zip.pack({
     files: [
       {name: 'hello.txt', str: 'hello!'},
       {name: 'sub', dir: [
         {name: 'hoge.png', buffer: pngbuff}
       ]}
     ]
   });
   
   var loader = jz.zip.unpack(packed);
   //view file paths
   console.log(loader.getFileNames());
   //view hello.txt
   loader.getFileAsText('hello.txt', console.log);
   //view hoge.png
   loader.getFileAsDataURL('sub/hoge.png', function(dataurl){
     var image = document.getElementById("image");
     image.src = dataurl;
   });
   
jz.utils
--------

Utility functions.

jz.utils.toBytes
~~~~~~~~~~~~~~~~

Convert from ``ArrayBuffer`` , ``Array`` or ``String`` to ``Uint8Array`` .
Return a original data if argument is ``Uint8Array`` .

.. js:function:: jz.utils.toBytes(buffer)

   :param ArrayBuffer|Uint8Array|Array|string buffer: byte sequence.
   :returns: Uint8Array

jz.utils.stringToArrayBuffer
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. 文字列をUTF8として ``ArrayBuffer`` に変換します。もちろん日本語も変換できます。

Convert from ``String`` as UTF8 to ``ArrayBuffer`` .
 
.. js:function:: jz.utils.stringToArrayBuffer(str)

   :param string str:
   :returns: Return a converted data as ``ArrayBuffer`` .

jz.utils.loadSync
~~~~~~~~~~~~~~~~~

.. Ajaxで同期的にバイナリファイルを読み込みます。
 本当は非推奨なんですが。

Load a file synchronously.

.. js:function:: jz.utils.loadSync(url)

   :param string url: File URL
   :returns: Return a data as ``ArrayBuffer`` .

jz.utils.load
~~~~~~~~~~~~~

.. Ajaxで非同期的にバイナリファイルを読み込みます。複数ファイルの指定が可能です

Load files asynchronously.

.. js:function:: jz.utils.load(url, complete)

   :param string|Array.<string> urls: File URL
   :param function(...ArrayBuffer) complete: Callback function.

例:

.. code-block:: javascript

   jz.utils.load(['hello.txt', 'hoge.txt'], function(hello, hoge){
     //do something.
   });

jz.utils.concatByteArrays
~~~~~~~~~~~~~~~~~~~~~~~~~

.. 複数のバイト列を一つのバイト列にまとめます。
	ネイティブのAPIを使っているので高速です(多分)。

Concat byte sequences.

.. js:function:: jz.utils.concatByteArrays(byteArrays)

   :param ...Uint8Array byteArrays: Byte sequences
   :return: Return concated byte sequence as ``Uint8Array`` .

例:

.. code-block:: javascript

   //same mean.
   var concated = jz.utils.concatByteArrays([bytes1, bytes2, bytes3]);
   var concated = jz.utils.concatByteArrays(bytes1, bytes2, bytes3);