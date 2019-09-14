'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-env mocha */
var assert = require('assert');
var Fcbuffer = require('fcbuffer');
var ByteBuffer = require('bytebuffer');

var Eos = require('.');

describe('shorthand', function () {

  it('authority', function _callee() {
    var eos, eosio, authority, pubkey, auth;
    return _regenerator2.default.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            eos = Eos({ keyPrefix: 'PUB' });
            _context.next = 3;
            return _regenerator2.default.awrap(eos.contract('eosio'));

          case 3:
            eosio = _context.sent;
            authority = eosio.fc.structs.authority;
            pubkey = 'PUB6MRyAjQq8ud7hVNYcfnVPJqcVpscN5So8BhtHuGYqET5GDW5CV';
            auth = { threshold: 1, keys: [{ key: pubkey, weight: 1 }] };


            assert.deepEqual(authority.fromObject(pubkey), auth);
            assert.deepEqual(authority.fromObject(auth), Object.assign({}, auth, { accounts: [], waits: [] }));

          case 9:
          case 'end':
            return _context.stop();
        }
      }
    }, null, undefined);
  });

  it('PublicKey sorting', function _callee2() {
    var eos, eosio, authority, pubkeys, authSorted, authUnsorted;
    return _regenerator2.default.async(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            eos = Eos();
            _context2.next = 3;
            return _regenerator2.default.awrap(eos.contract('eosio'));

          case 3:
            eosio = _context2.sent;
            authority = eosio.fc.structs.authority;
            pubkeys = ['EOS7wBGPvBgRVa4wQN2zm5CjgBF6S7tP7R3JavtSa2unHUoVQGhey', 'EOS6MRyAjQq8ud7hVNYcfnVPJqcVpscN5So8BhtHuGYqET5GDW5CV'];
            authSorted = { threshold: 1, keys: [{ key: pubkeys[1], weight: 1 }, { key: pubkeys[0], weight: 1 }], accounts: [], waits: [] };
            authUnsorted = { threshold: 1, keys: [{ key: pubkeys[0], weight: 1 }, { key: pubkeys[1], weight: 1 }], accounts: [], waits: []

              // assert.deepEqual(authority.fromObject(pubkey), auth)
            };
            assert.deepEqual(authority.fromObject(authUnsorted), authSorted);

          case 9:
          case 'end':
            return _context2.stop();
        }
      }
    }, null, undefined);
  });

  it('public_key', function () {
    var eos = Eos({ keyPrefix: 'PUB' });
    var _eos$fc = eos.fc,
        structs = _eos$fc.structs,
        types = _eos$fc.types;

    var PublicKeyType = types.public_key();
    var pubkey = 'PUB6MRyAjQq8ud7hVNYcfnVPJqcVpscN5So8BhtHuGYqET5GDW5CV';
    // 02c0ded2bc1f1305fb0faac5e6c03ee3a1924234985427b6167ca569d13df435cf
    assertSerializer(PublicKeyType, pubkey);
  });

  it('symbol', function () {
    var eos = Eos();
    var types = eos.fc.types;

    var _Symbol = types.symbol();
    assertSerializer(_Symbol, '4,SYS', '4,SYS', 'SYS');
  });

  it('symbol_code', function () {
    var eos = Eos({ defaults: true });
    var types = eos.fc.types;

    var SymbolCode = types.symbol_code();
    assertSerializer(SymbolCode, SymbolCode.toObject());
  });

  it('extended_symbol', function () {
    var eos = Eos({ defaults: true });
    var esType = eos.fc.types.extended_symbol();
    // const esString = esType.toObject()
    assertSerializer(esType, '4,SYS@contract');
  });

  it('asset', function () {
    var eos = Eos();
    var types = eos.fc.types;

    var aType = types.asset();
    assertSerializer(aType, '1.0001 SYS');
  });

  it('extended_asset', function () {
    var eos = Eos({ defaults: true });
    var eaType = eos.fc.types.extended_asset();
    assertSerializer(eaType, eaType.toObject());
  });

  it('signature', function () {
    var eos = Eos();
    var types = eos.fc.types;

    var SignatureType = types.signature();
    var signatureString = 'SIG_K1_JwxtqesXpPdaZB9fdoVyzmbWkd8tuX742EQfnQNexTBfqryt2nn9PomT5xwsVnUB4m7KqTgTBQKYf2FTYbhkB5c7Kk9EsH';
    //const signatureString = 'SIG_K1_Jzdpi5RCzHLGsQbpGhndXBzcFs8vT5LHAtWLMxPzBdwRHSmJkcCdVu6oqPUQn1hbGUdErHvxtdSTS1YA73BThQFwV1v4G5'
    assertSerializer(SignatureType, signatureString);
  });
});

describe('Eosio Abi', function () {

  function checkContract(name) {
    it(name + ' contract parses', function (done) {
      var eos = Eos();

      eos.contract('eosio.token', function (error, eosio_token) {
        assert(!error, error);
        assert(eosio_token.transfer, 'eosio.token contract');
        assert(eosio_token.issue, 'eosio.token contract');
        done();
      });
    });
  }
  checkContract('eosio');
  checkContract('eosio.token');

  it('abi', function _callee3() {
    var eos, abi_def, setabi, obj, json;
    return _regenerator2.default.async(function _callee3$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            setabi = function setabi(abi) {
              var buf;
              return _regenerator2.default.async(function setabi$(_context3) {
                while (1) {
                  switch (_context3.prev = _context3.next) {
                    case 0:
                      _context3.next = 2;
                      return _regenerator2.default.awrap(eos.setabi('inita', abi));

                    case 2:
                      // See README
                      buf = eos.fc.toBuffer('abi_def', abi);
                      _context3.next = 5;
                      return _regenerator2.default.awrap(eos.setabi('inita', buf));

                    case 5:
                      _context3.next = 7;
                      return _regenerator2.default.awrap(eos.setabi('inita', buf.toString('hex')));

                    case 7:
                    case 'end':
                      return _context3.stop();
                  }
                }
              }, null, this);
            };

            eos = Eos({ defaults: true, broadcast: false, sign: false });
            abi_def = eos.fc.structs.abi_def;
            obj = abi_def.toObject();
            json = JSON.stringify(obj);
            _context4.next = 7;
            return _regenerator2.default.awrap(setabi(obj));

          case 7:
            _context4.next = 9;
            return _regenerator2.default.awrap(setabi(abi_def.fromObject(obj)));

          case 9:
            _context4.next = 11;
            return _regenerator2.default.awrap(setabi(abi_def.fromObject(json)));

          case 11:
            _context4.next = 13;
            return _regenerator2.default.awrap(setabi(abi_def.fromObject(Buffer.from(json).toString('hex'))));

          case 13:
            _context4.next = 15;
            return _regenerator2.default.awrap(setabi(abi_def.fromObject(Buffer.from(json))));

          case 15:
          case 'end':
            return _context4.stop();
        }
      }
    }, null, undefined);
  });
});

describe('Action.data', function () {
  it('json', function () {
    var eos = Eos({ forceActionDataHex: false });
    var _eos$fc2 = eos.fc,
        structs = _eos$fc2.structs,
        types = _eos$fc2.types;

    var value = {
      account: 'eosio.token',
      name: 'transfer',
      data: {
        from: 'inita',
        to: 'initb',
        quantity: '1.0000 SYS',
        memo: ''
      },
      authorization: []
    };
    assertSerializer(structs.action, value);
  });

  it('force hex', function () {
    var eos = Eos({ forceActionDataHex: true });
    var _eos$fc3 = eos.fc,
        structs = _eos$fc3.structs,
        types = _eos$fc3.types;

    var value = {
      account: 'eosio.token',
      name: 'transfer',
      data: {
        from: 'inita',
        to: 'initb',
        quantity: '1.0000 SYS',
        memo: ''
      },
      authorization: []
    };
    assertSerializer(structs.action, value, value);
  });

  it('unknown action', function () {
    var eos = Eos({ forceActionDataHex: false });
    var _eos$fc4 = eos.fc,
        structs = _eos$fc4.structs,
        types = _eos$fc4.types;

    var value = {
      account: 'eosio.token',
      name: 'mytype',
      data: '030a0b0c',
      authorization: []
    };
    assert.throws(function () {
      return assertSerializer(structs.action, value);
    }, /Missing ABI action/);
  });
});

function assertSerializer(type, value) {
  var fromObjectResult = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  var toObjectResult = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : fromObjectResult;

  var obj = type.fromObject(value); // tests fromObject
  var buf = Fcbuffer.toBuffer(type, value); // tests appendByteBuffer
  var obj2 = Fcbuffer.fromBuffer(type, buf); // tests fromByteBuffer
  var obj3 = type.toObject(obj); // tests toObject

  if (!fromObjectResult && !toObjectResult) {
    assert.deepEqual(value, obj3, 'serialize object');
    assert.deepEqual(obj3, obj2, 'serialize buffer');
    return;
  }

  if (fromObjectResult) {
    assert(fromObjectResult, obj, 'fromObjectResult');
    assert(fromObjectResult, obj2, 'fromObjectResult');
  }

  if (toObjectResult) {
    assert(toObjectResult, obj3, 'toObjectResult');
  }
}