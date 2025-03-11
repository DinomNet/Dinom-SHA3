/**
 * Dinom-SHA3.js Library, by Dinom
 * Version: v1.0
 * Official Repository: https://github.com/DinomNet/Dinom-SHA3/
 * 
 * MIT License
 * 
 * Copyright (c) 2025, github.com/Chefaroon
 * 
 * Permission is hereby granted, free of charge, to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NONINFRINGMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES, OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT, OR OTHERWISE, ARISING FROM, OUT OF, OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

!(function(_global,undefined){
	function SHA3(){
		// ___Private methods
			__defaultOpts={
				'padding': 'sha-3',
				'format': 'string'
			};

			// Convert HEX to string
			function __Hex2String(hex){
				var s=hex.replace(' ',''); // Accomodate for spaces
				return s==''?'':s.match(/.{2}/g).map(b=>String.fromCharCode(parseInt(b,16))).join('');
			}

			// Ensure text is encoded in UTF8
			function __toUTF8(str){
				try{
					return new TextEncoder().encode(str,'utf-8').reduce((p,c)=>p+String.fromCharCode(c),'');
				}
				catch(e){
					return decodeURIComponent(encodeURIComponent(str));
				}
			}

			// 64bit left rotation
			function __rotate(a,b){
				return BigInt.asUintN(64,a<<BigInt(b)|a>>BigInt(64-b));
			}

			function __permutate(s){
				var rounds=24;
				var a=[0x0000000000000001n,0x0000000000008082n,0x800000000000808an,0x8000000080008000n,0x000000000000808bn,0x0000000080000001n,0x8000000080008081n,0x8000000000008009n,0x000000000000008an,0x0000000000000088n,0x0000000080008009n,0x000000008000000an,0x000000008000808bn,0x800000000000008bn,0x8000000000008089n,0x8000000000008003n,0x8000000000008002n,0x8000000000000080n,0x000000000000800an,0x800000008000000an,0x8000000080008081n,0x8000000000008080n,0x0000000080000001n,0x8000000080008008n];
				for(var i=0; i<rounds; i++){
					var b=[],c=[];
					for(var ii=0; ii<5; ii++){
						b[ii]=s[ii][0];
						for(var iii=1; iii<5; iii++){
							b[ii]=b[ii]^s[ii][iii];
						}
					}
					for(var ii=0; ii<5; ii++){
						c[ii]=b[(ii+4)%5]^__rotate(b[(ii+1)%5],1);

						for(var iii=0; iii<5; iii++){
							s[ii][iii]=s[ii][iii]^c[ii];
						}
					}
					var [x,y]=[1,0];
					var cur=s[x][y];
				
					for(var ii=0; ii<24; ii++){
						var [X,Y]=[y,(2*x+3*y)%5];
						var temp=s[X][Y];
						s[X][Y]=__rotate(cur, ((ii+1)*(ii+2)/2)%64);
						cur=temp;
						[x,y]=[X,Y];
					}				
					for(var ii=0; ii<5; ii++){
						var b=[];
						for(var iii=0; iii<5; iii++){b[iii]=s[iii][ii];}
						for(var iii=0; iii<5; iii++){
							s[iii][ii]=(b[iii]^((~b[(iii+1)%5]) & b[(iii+2)%5]));
						}
					}
					s[0][0]=(s[0][0]^a[i]);
				}
			}

			function __formatOut(s,length){
				return s.map((a,b)=>s.map(c=>c[b]))
				.map(p=>p.map(l=>l.toString(16).padStart(16, '0').match(/.{2}/g).reverse().join('')).join(''))
				.join('')
				.slice(0, length/4);
			}

			function __keccakHash(rate, capacity, str, opts){
				var options=Object.assign(__defaultOpts, opts);
				var length=capacity/2;
				var data=null;
				switch(options.format){
					case 'hex':
					case 'hex-bytes':
						data=__Hex2String(str);
						break;
					case 'string':
					default:
							data=__toUTF8(str);
						break;
				}

				var s=[[],[],[],[],[]];
				for(var x=0;x<5;x++){
					for(var y=0;y<5;y++){s[x][y]=0n;}
				}

				// Add Padding
				var q=(rate/8)-data.length%(rate/8);
				if(q==1){
					data+=String.fromCharCode(options.padding=='keccak'?0x81:0x86);
				}
				else{
					data+=String.fromCharCode(options.padding=='keccak'?0x01:0x06)+String.fromCharCode(0x00).repeat(q-2)+String.fromCharCode(0x80);
				}

				// Block size in bytes
				var blockSize=rate/64*8;

				for(var i=0; i<data.length; i+=blockSize){
					for(var k=0; k<rate/64; k++){
						var ii=
							(BigInt(data.charCodeAt(i+k*8+0))<< 0n) +
							(BigInt(data.charCodeAt(i+k*8+1))<< 8n) +
							(BigInt(data.charCodeAt(i+k*8+2))<<16n) +
							(BigInt(data.charCodeAt(i+k*8+3))<<24n) +
							(BigInt(data.charCodeAt(i+k*8+4))<<32n) +
							(BigInt(data.charCodeAt(i+k*8+5))<<40n) +
							(BigInt(data.charCodeAt(i+k*8+6))<<48n) +
							(BigInt(data.charCodeAt(i+k*8+7))<<56n);
						var x=k%5;
						var y=Math.floor(k/5);
						s[x][y]=s[x][y]^ii;
					}
					__permutate(s);
				}

				return __formatOut(s,length);
			}
		// Public methods
			/**
			 * Generate 512-bit SHA-3 hash of the passed text
			 * Total length of the hash sum is 128 characters
			 * 
			 * @param {string} string - Text to hash
			 * @param {Object} opts:
			 * 	{
			 * 		padding: sha-3 | keccak
			 * 		format: string | hex
			 * 	}
			 * @returns {string} Hash sum of the passed text
			 * 	(or Hex string of the hashed text, if format==hex)
			 */
			function sha3_512(string, opts){
				return __keccakHash(576, 1024, string, opts);
			}

			// ^^ | Total lenght is 96 characters
			function sha3_384(string, opts){
				return __keccakHash(832, 768, string, opts);
			}

			// ^^ | Total lenght is 64 characters
			function sha3_256(string, opts){
				return __keccakHash(1088, 512, string, opts);
			}

			// ^^ | Total lenght is 56 characters
			function sha3_224(string, opts){
				return __keccakHash(1152, 448, string, opts);
			}

		// Export the publicly accessible methods
		return{
			'224':sha3_224,
			'256':sha3_256,
			'384':sha3_384,
			'512':sha3_512
		}
	}

	// Node module
	if(typeof module!=='undefined' && module.exports){ module.exports=SHA3; }

	// AMD module
	else if(typeof define==='function' && define.amd){
		define(function(){
			return SHA3;
		});
	}

	// Browser
	else{ _global['SHA3']=new SHA3; }

}(typeof window!=='undefined'?window:this));
