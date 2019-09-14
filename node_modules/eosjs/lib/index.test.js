'use strict';

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-env mocha */
var assert = require('assert');
var fs = require('fs');

var Eos = require('.');
var ecc = Eos.modules.ecc;

var _require = require('eosjs-keygen'),
    Keystore = _require.Keystore;

var wif = '5KQwrPbwdL6PhXujxW37FSSQZ1JiwsST4cqQzDeyXtP79zkvFD3';

describe('version', function () {
  it('exposes a version number', function () {
    assert.ok(Eos.version);
  });
});

describe('offline', function () {
  var headers = {
    expiration: new Date().toISOString().split('.')[0], // Don't use `new Date` in production
    ref_block_num: 1,
    ref_block_prefix: 452435776,
    max_net_usage_words: 0,
    max_cpu_usage_ms: 0,
    delay_sec: 0,
    context_free_actions: [],
    transaction_extensions: []
  };

  it('multi-signature', function _callee() {
    var transactionHeaders, eos, trx;
    return _regenerator2.default.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            transactionHeaders = function transactionHeaders(expireInSeconds, callback) {
              callback(null /*error*/, headers);
            };

            eos = Eos({
              keyProvider: [ecc.seedPrivate('key1'), ecc.seedPrivate('key2')],
              httpEndpoint: null,
              transactionHeaders: transactionHeaders
            });
            _context.next = 4;
            return _regenerator2.default.awrap(eos.nonce(1, { authorization: 'inita' }));

          case 4:
            trx = _context.sent;

            assert.equal(trx.transaction.signatures.length, 2, 'signature count');

          case 6:
          case 'end':
            return _context.stop();
        }
      }
    }, null, this);
  });

  describe('custom transactions', function () {
    var nonce = {
      account: 'eosio.null',
      name: 'nonce',
      data: '010f'
    };

    var authorization = [{
      actor: 'inita',
      permission: 'active'
    }];

    var eos = Eos({
      keyProvider: wif
    });

    it('context_free_actions', function _callee2() {
      return _regenerator2.default.async(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return _regenerator2.default.awrap(eos.transaction({
                context_free_actions: [nonce], // can't have authorization
                actions: [
                // only action, needs an authorization
                Object.assign({}, nonce, { authorization: authorization })]
              }));

            case 2:
            case 'end':
              return _context2.stop();
          }
        }
      }, null, this);
    });

    it('nonce', function _callee3() {
      var trx;
      return _regenerator2.default.async(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return _regenerator2.default.awrap(eos.transaction({
                actions: [Object.assign({}, nonce, { authorization: authorization })]
              }));

            case 2:
              trx = _context3.sent;

            case 3:
            case 'end':
              return _context3.stop();
          }
        }
      }, null, this);
    });
  });

  describe('transaction headers', function _callee9() {
    var headerOverrides, transactionHeaders, xfer, eos;
    return _regenerator2.default.async(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            headerOverrides = {
              max_net_usage_words: 333,
              max_cpu_usage_ms: 222,
              delay_sec: 369
            };
            transactionHeaders = Object.assign({}, headers, headerOverrides);
            xfer = ['few', 'many', '100.0000 SYS', '' /*memo*/];


            it('global', function _callee4() {
              var eos, trx;
              return _regenerator2.default.async(function _callee4$(_context4) {
                while (1) {
                  switch (_context4.prev = _context4.next) {
                    case 0:
                      eos = Eos({
                        keyProvider: wif,
                        httpEndpoint: null,
                        transactionHeaders: transactionHeaders
                      });
                      _context4.next = 3;
                      return _regenerator2.default.awrap(eos.transfer.apply(eos, xfer));

                    case 3:
                      trx = _context4.sent;


                      assert.deepEqual({
                        expiration: trx.transaction.transaction.expiration,
                        ref_block_num: trx.transaction.transaction.ref_block_num,
                        ref_block_prefix: trx.transaction.transaction.ref_block_prefix,
                        max_net_usage_words: trx.transaction.transaction.max_net_usage_words,
                        max_cpu_usage_ms: trx.transaction.transaction.max_cpu_usage_ms,
                        delay_sec: trx.transaction.transaction.delay_sec,
                        context_free_actions: [],
                        transaction_extensions: []
                      }, transactionHeaders);

                      assert.equal(trx.transaction.signatures.length, 1, 'signature count');

                    case 6:
                    case 'end':
                      return _context4.stop();
                  }
                }
              }, null, this);
            });

            eos = Eos({
              sign: false,
              broadcast: false,
              keyProvider: wif,
              httpEndpoint: null,
              transactionHeaders: headers
            });


            it('object', function _callee5() {
              var trx;
              return _regenerator2.default.async(function _callee5$(_context5) {
                while (1) {
                  switch (_context5.prev = _context5.next) {
                    case 0:
                      _context5.next = 2;
                      return _regenerator2.default.awrap(eos.transaction({
                        delay_sec: 369,
                        actions: [{
                          account: 'eosio.null',
                          name: 'nonce',
                          data: '010f',
                          authorization: [{ actor: 'inita', permission: 'owner' }]
                        }]
                      }));

                    case 2:
                      trx = _context5.sent;

                      assert.equal(trx.transaction.transaction.delay_sec, 369, 'delay_sec');

                    case 4:
                    case 'end':
                      return _context5.stop();
                  }
                }
              }, null, this);
            });

            it('action', function _callee6() {
              var trx;
              return _regenerator2.default.async(function _callee6$(_context6) {
                while (1) {
                  switch (_context6.prev = _context6.next) {
                    case 0:
                      _context6.next = 2;
                      return _regenerator2.default.awrap(eos.transfer.apply(eos, xfer.concat([{ delay_sec: 369 }])));

                    case 2:
                      trx = _context6.sent;

                      assert.equal(trx.transaction.transaction.delay_sec, 369, 'delay_sec');

                    case 4:
                    case 'end':
                      return _context6.stop();
                  }
                }
              }, null, this);
            });

            it('callback', function _callee7() {
              var trx;
              return _regenerator2.default.async(function _callee7$(_context7) {
                while (1) {
                  switch (_context7.prev = _context7.next) {
                    case 0:
                      _context7.next = 2;
                      return _regenerator2.default.awrap(eos.transaction(function (tr) {
                        tr.transfer.apply(tr, xfer);
                      }, { delay_sec: 369 }));

                    case 2:
                      trx = _context7.sent;

                      assert.equal(trx.transaction.transaction.delay_sec, 369, 'delay_sec');

                    case 4:
                    case 'end':
                      return _context7.stop();
                  }
                }
              }, null, this);
            });

            it('contract', function _callee8() {
              var trx;
              return _regenerator2.default.async(function _callee8$(_context8) {
                while (1) {
                  switch (_context8.prev = _context8.next) {
                    case 0:
                      _context8.next = 2;
                      return _regenerator2.default.awrap(eos.transaction('eosio.token', function (eosio_token) {
                        eosio_token.transfer.apply(eosio_token, xfer);
                      }, { delay_sec: 369 }));

                    case 2:
                      trx = _context8.sent;

                      assert.equal(trx.transaction.transaction.delay_sec, 369, 'delay_sec');

                    case 4:
                    case 'end':
                      return _context8.stop();
                  }
                }
              }, null, this);
            });

          case 9:
          case 'end':
            return _context9.stop();
        }
      }
    }, null, this);
  });

  it('load abi', function _callee10() {
    var eos, abiBuffer, abiObject, bios;
    return _regenerator2.default.async(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            eos = Eos({ httpEndpoint: null });
            abiBuffer = fs.readFileSync('docker/contracts/eosio.bios/eosio.bios.abi');
            abiObject = JSON.parse(abiBuffer);


            assert.deepEqual(abiObject, eos.fc.abiCache.abi('eosio.bios', abiBuffer).abi);
            assert.deepEqual(abiObject, eos.fc.abiCache.abi('eosio.bios', abiObject).abi);

            _context10.next = 7;
            return _regenerator2.default.awrap(eos.contract('eosio.bios'));

          case 7:
            bios = _context10.sent;

            assert(typeof bios.newaccount === 'function', 'unrecognized contract');

          case 9:
          case 'end':
            return _context10.stop();
        }
      }
    }, null, this);
  });
});

// describe('networks', () => {
//   it('testnet', (done) => {
//     const eos = Eos()
//     eos.getBlock(1, (err, block) => {
//       if(err) {
//         throw err
//       }
//       done()
//     })
//   })
// })

describe('Contracts', function () {
  it('Messages do not sort', function _callee11() {
    var local, opts, tx;
    return _regenerator2.default.async(function _callee11$(_context11) {
      while (1) {
        switch (_context11.prev = _context11.next) {
          case 0:
            local = Eos();
            opts = { sign: false, broadcast: false };
            _context11.next = 4;
            return _regenerator2.default.awrap(local.transaction(['currency', 'eosio.token'], function (_ref) {
              var currency = _ref.currency,
                  eosio_token = _ref.eosio_token;

              // make sure {account: 'eosio.token', ..} remains first
              eosio_token.transfer('inita', 'initd', '1.1000 SYS', '');

              // {account: 'currency', ..} remains second (reverse sort)
              currency.transfer('inita', 'initd', '1.2000 CUR', '');
            }, opts));

          case 4:
            tx = _context11.sent;

            assert.equal(tx.transaction.transaction.actions[0].account, 'eosio.token');
            assert.equal(tx.transaction.transaction.actions[1].account, 'currency');

          case 7:
          case 'end':
            return _context11.stop();
        }
      }
    }, null, this);
  });
});

describe('Contract', function () {
  function deploy(contract) {
    var account = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'inita';

    it('deploy ' + contract + '@' + account, function _callee12() {
      var config, eos, wasm, abi, code, diskAbi;
      return _regenerator2.default.async(function _callee12$(_context12) {
        while (1) {
          switch (_context12.prev = _context12.next) {
            case 0:
              this.timeout(4000);
              // console.log('todo, skipping deploy ' + `${contract}@${account}`)
              config = { binaryen: require("binaryen"), keyProvider: wif };
              eos = Eos(config);
              wasm = fs.readFileSync('docker/contracts/' + contract + '/' + contract + '.wasm');
              abi = fs.readFileSync('docker/contracts/' + contract + '/' + contract + '.abi');
              _context12.next = 7;
              return _regenerator2.default.awrap(eos.setcode(account, 0, 0, wasm));

            case 7:
              _context12.next = 9;
              return _regenerator2.default.awrap(eos.setabi(account, JSON.parse(abi)));

            case 9:
              _context12.next = 11;
              return _regenerator2.default.awrap(eos.getAbi(account));

            case 11:
              code = _context12.sent;
              diskAbi = JSON.parse(abi);

              delete diskAbi.____comment;
              if (!diskAbi.error_messages) {
                diskAbi.error_messages = [];
              }

              assert.deepEqual(diskAbi, code.abi);

            case 16:
            case 'end':
              return _context12.stop();
          }
        }
      }, null, this);
    });
  }

  // When ran multiple times, deploying to the same account
  // avoids a same contract version deploy error.
  // TODO: undeploy contract instead (when API allows this)

  deploy('eosio.msig');
  deploy('eosio.token');
  deploy('eosio.bios');
  deploy('eosio.system');
});

describe('Contracts Load', function () {
  function load(name) {
    it(name, function _callee13() {
      var eos, contract;
      return _regenerator2.default.async(function _callee13$(_context13) {
        while (1) {
          switch (_context13.prev = _context13.next) {
            case 0:
              eos = Eos();
              _context13.next = 3;
              return _regenerator2.default.awrap(eos.contract(name));

            case 3:
              contract = _context13.sent;

              assert(contract, 'contract');

            case 5:
            case 'end':
              return _context13.stop();
          }
        }
      }, null, this);
    });
  }
  load('eosio');
  load('eosio.token');
});

describe('keyProvider', function () {
  var keyProvider = function keyProvider() {
    return [wif];
  };

  it('global', function _callee14() {
    var eos;
    return _regenerator2.default.async(function _callee14$(_context14) {
      while (1) {
        switch (_context14.prev = _context14.next) {
          case 0:
            eos = Eos({ keyProvider: keyProvider });
            _context14.next = 3;
            return _regenerator2.default.awrap(eos.transfer('inita', 'initb', '1.0001 SYS', ''));

          case 3:
          case 'end':
            return _context14.stop();
        }
      }
    }, null, this);
  });

  it('per-action', function _callee15() {
    var eos, token;
    return _regenerator2.default.async(function _callee15$(_context15) {
      while (1) {
        switch (_context15.prev = _context15.next) {
          case 0:
            eos = Eos();
            _context15.next = 3;
            return _regenerator2.default.awrap(eos.transfer('inita', 'initb', '1.0002 SYS', '', { keyProvider: keyProvider }));

          case 3:
            _context15.next = 5;
            return _regenerator2.default.awrap(eos.transaction(function (tr) {
              tr.transfer('inita', 'initb', '1.0003 SYS', '');
            }, { keyProvider: keyProvider }));

          case 5:
            _context15.next = 7;
            return _regenerator2.default.awrap(eos.contract('eosio.token'));

          case 7:
            token = _context15.sent;
            _context15.next = 10;
            return _regenerator2.default.awrap(token.transfer('inita', 'initb', '1.0004 SYS', '', { keyProvider: keyProvider }));

          case 10:
          case 'end':
            return _context15.stop();
        }
      }
    }, null, this);
  });

  it('multiple private keys (get_required_keys)', function () {
    // keyProvider should return an array of keys
    var keyProvider = function keyProvider() {
      return ['5K84n2nzRpHMBdJf95mKnPrsqhZq7bhUvrzHyvoGwceBHq8FEPZ', wif];
    };

    var eos = Eos({ keyProvider: keyProvider });

    return eos.transfer('inita', 'initb', '1.2740 SYS', '', false).then(function (tr) {
      assert.equal(tr.transaction.signatures.length, 1);
      assert.equal((0, _typeof3.default)(tr.transaction.signatures[0]), 'string');
    });
  });

  // If a keystore is used, the keyProvider should return available
  // public keys first then respond with private keys next.
  it('public keys then private key', function () {
    var pubkey = ecc.privateToPublic(wif);

    // keyProvider should return a string or array of keys.
    var keyProvider = function keyProvider(_ref2) {
      var transaction = _ref2.transaction,
          pubkeys = _ref2.pubkeys;

      if (!pubkeys) {
        assert.equal(transaction.actions[0].name, 'transfer');
        return [pubkey];
      }

      if (pubkeys) {
        assert.deepEqual(pubkeys, [pubkey]);
        return [wif];
      }
      assert(false, 'unexpected keyProvider callback');
    };

    var eos = Eos({ keyProvider: keyProvider });

    return eos.transfer('inita', 'initb', '9.0000 SYS', '', false).then(function (tr) {
      assert.equal(tr.transaction.signatures.length, 1);
      assert.equal((0, _typeof3.default)(tr.transaction.signatures[0]), 'string');
    });
  });

  it('from eosjs-keygen', function () {
    var keystore = Keystore('uid');
    keystore.deriveKeys({ parent: wif });
    var eos = Eos({ keyProvider: keystore.keyProvider });
    return eos.transfer('inita', 'initb', '12.0000 SYS', '', true);
  });

  it('return Promise', function () {
    var eos = Eos({ keyProvider: new Promise(function (resolve) {
        resolve(wif);
      }) });
    return eos.transfer('inita', 'initb', '1.6180 SYS', '', true);
  });
});

describe('signProvider', function () {
  it('custom', function () {
    var customSignProvider = function customSignProvider(_ref3) {
      var buf = _ref3.buf,
          sign = _ref3.sign,
          transaction = _ref3.transaction;


      // All potential keys (EOS6MRy.. is the pubkey for 'wif')
      var pubkeys = ['EOS6MRyAjQq8ud7hVNYcfnVPJqcVpscN5So8BhtHuGYqET5GDW5CV'];

      return eos.getRequiredKeys(transaction, pubkeys).then(function (res) {
        // Just the required_keys need to sign
        assert.deepEqual(res.required_keys, pubkeys);
        return sign(buf, wif); // return hex string signature or array of signatures
      });
    };

    var eos = Eos({ signProvider: customSignProvider });
    return eos.transfer('inita', 'initb', '2.0000 SYS', '', false);
  });
});

describe('transactions', function () {
  var signProvider = function signProvider(_ref4) {
    var sign = _ref4.sign,
        buf = _ref4.buf;
    return sign(buf, wif);
  };
  var promiseSigner = function promiseSigner(args) {
    return Promise.resolve(signProvider(args));
  };

  it('usage', function () {
    var eos = Eos({ signProvider: signProvider });
    eos.setprods();
  });

  it('create asset', function _callee16() {
    var eos, pubkey, auth;
    return _regenerator2.default.async(function _callee16$(_context16) {
      while (1) {
        switch (_context16.prev = _context16.next) {
          case 0:
            eos = Eos({ signProvider: signProvider });
            pubkey = 'EOS6MRyAjQq8ud7hVNYcfnVPJqcVpscN5So8BhtHuGYqET5GDW5CV';
            auth = { authorization: 'eosio.token' };
            _context16.next = 5;
            return _regenerator2.default.awrap(eos.create('eosio.token', '10000 ' + randomAsset(), auth));

          case 5:
            _context16.next = 7;
            return _regenerator2.default.awrap(eos.create('eosio.token', '10000.00 ' + randomAsset(), auth));

          case 7:
          case 'end':
            return _context16.stop();
        }
      }
    }, null, this);
  });

  it('newaccount (broadcast)', function () {
    var eos = Eos({ signProvider: signProvider });
    var pubkey = 'EOS6MRyAjQq8ud7hVNYcfnVPJqcVpscN5So8BhtHuGYqET5GDW5CV';
    var name = randomName();

    return eos.transaction(function (tr) {
      tr.newaccount({
        creator: 'eosio',
        name: name,
        owner: pubkey,
        active: pubkey
      });

      tr.buyrambytes({
        payer: 'eosio',
        receiver: name,
        bytes: 8192
      });

      tr.delegatebw({
        from: 'eosio',
        receiver: name,
        stake_net_quantity: '10.0000 SYS',
        stake_cpu_quantity: '10.0000 SYS',
        transfer: 0
      });
    });
  });

  it('mockTransactions pass', function () {
    var eos = Eos({ signProvider: signProvider, mockTransactions: 'pass' });
    return eos.transfer('inita', 'initb', '1.0000 SYS', '').then(function (transfer) {
      assert(transfer.mockTransaction, 'transfer.mockTransaction');
    });
  });

  it('mockTransactions fail', function () {
    var eos = Eos({ signProvider: signProvider, mockTransactions: 'fail' });
    return eos.transfer('inita', 'initb', '1.0000 SYS', '').catch(function (error) {
      assert(error.indexOf('fake error') !== -1, 'expecting: fake error');
    });
  });

  it('transfer (broadcast)', function () {
    var eos = Eos({ signProvider: signProvider });
    return eos.transfer('inita', 'initb', '1.0000 SYS', '');
  });

  it('transfer custom token precision (broadcast)', function () {
    var eos = Eos({ signProvider: signProvider });
    return eos.transfer('inita', 'initb', '1.618 PHI', '');
  });

  it('transfer custom authorization (broadcast)', function () {
    var eos = Eos({ signProvider: signProvider });
    return eos.transfer('inita', 'initb', '1.0000 SYS', '', { authorization: 'inita@owner' });
  });

  it('transfer custom authorization (permission only)', function _callee17() {
    var eos, tr;
    return _regenerator2.default.async(function _callee17$(_context17) {
      while (1) {
        switch (_context17.prev = _context17.next) {
          case 0:
            eos = Eos({ signProvider: signProvider, broadcast: false, authorization: '@posting' });
            _context17.next = 3;
            return _regenerator2.default.awrap(eos.transfer('inita', 'initb', '1.0000 SYS', ''));

          case 3:
            tr = _context17.sent;

            assert.deepEqual(tr.transaction.transaction.actions[0].authorization, [{ actor: 'inita', permission: 'posting' }]);

          case 5:
          case 'end':
            return _context17.stop();
        }
      }
    }, null, undefined);
  });

  it('transfer custom global authorization', function _callee18() {
    var authorization, eos, tr;
    return _regenerator2.default.async(function _callee18$(_context18) {
      while (1) {
        switch (_context18.prev = _context18.next) {
          case 0:
            authorization = [{ actor: 'inita', permission: 'posting' }];
            eos = Eos({ signProvider: signProvider, authorization: authorization, broadcast: false });
            _context18.next = 4;
            return _regenerator2.default.awrap(eos.transfer('inita', 'initb', '1.0000 SYS', ''));

          case 4:
            tr = _context18.sent;

            assert.deepEqual(tr.transaction.transaction.actions[0].authorization, authorization);

          case 6:
          case 'end':
            return _context18.stop();
        }
      }
    }, null, undefined);
  });

  it('transfer custom authorization sorting (no broadcast)', function () {
    var eos = Eos({ signProvider: signProvider });
    return eos.transfer('inita', 'initb', '1.0000 SYS', '', { authorization: ['initb@owner', 'inita@owner'], broadcast: false }).then(function (_ref5) {
      var transaction = _ref5.transaction;

      var ans = [{ actor: 'inita', permission: 'owner' }, { actor: 'initb', permission: 'owner' }];
      assert.deepEqual(transaction.transaction.actions[0].authorization, ans);
    });
  });

  it('transfer (no broadcast)', function () {
    var eos = Eos({ signProvider: signProvider });
    return eos.transfer('inita', 'initb', '1.0000 SYS', '', { broadcast: false });
  });

  it('transfer (no broadcast, no sign)', function () {
    var eos = Eos({ signProvider: signProvider });
    var opts = { broadcast: false, sign: false };
    return eos.transfer('inita', 'initb', '1.0000 SYS', '', opts).then(function (tr) {
      return assert.deepEqual(tr.transaction.signatures, []);
    });
  });

  it('transfer sign promise (no broadcast)', function () {
    var eos = Eos({ signProvider: promiseSigner });
    return eos.transfer('inita', 'initb', '1.0000 SYS', '', false);
  });

  it('action to unknown contract', function (done) {
    Eos({ signProvider: signProvider }).contract('unknown432').then(function () {
      throw 'expecting error';
    }).catch(function (error) {
      // eslint-disable-line handle-callback-err
      done();
    });
  });

  it('action to contract', function () {
    return Eos({ signProvider: signProvider }).contract('eosio.token').then(function (token) {
      return token.transfer('inita', 'initb', '1.0000 SYS', '')
      // transaction sent on each command
      .then(function (tr) {
        assert.equal(1, tr.transaction.transaction.actions.length);

        return token.transfer('initb', 'inita', '1.0000 SYS', '').then(function (tr) {
          assert.equal(1, tr.transaction.transaction.actions.length);
        });
      });
    }).then(function (r) {
      assert(r == undefined);
    });
  });

  it('action to contract atomic', function _callee19() {
    var amt, eos, trTest, assertTr;
    return _regenerator2.default.async(function _callee19$(_context19) {
      while (1) {
        switch (_context19.prev = _context19.next) {
          case 0:
            amt = 1; // for unique transactions

            eos = Eos({ signProvider: signProvider });

            trTest = function trTest(eosio_token) {
              assert(eosio_token.transfer('inita', 'initb', amt + '.0000 SYS', '') == null);
              assert(eosio_token.transfer('initb', 'inita', amt++ + '.0000 SYS', '') == null);
            };

            assertTr = function assertTr(tr) {
              assert.equal(2, tr.transaction.transaction.actions.length);
            };

            //  contracts can be a string or array


            _context19.t0 = _regenerator2.default;
            _context19.t1 = assertTr;
            _context19.next = 8;
            return _regenerator2.default.awrap(eos.transaction(['eosio.token'], function (_ref6) {
              var eosio_token = _ref6.eosio_token;
              return trTest(eosio_token);
            }));

          case 8:
            _context19.t2 = _context19.sent;
            _context19.t3 = (0, _context19.t1)(_context19.t2);
            _context19.next = 12;
            return _context19.t0.awrap.call(_context19.t0, _context19.t3);

          case 12:
            _context19.t4 = _regenerator2.default;
            _context19.t5 = assertTr;
            _context19.next = 16;
            return _regenerator2.default.awrap(eos.transaction('eosio.token', function (eosio_token) {
              return trTest(eosio_token);
            }));

          case 16:
            _context19.t6 = _context19.sent;
            _context19.t7 = (0, _context19.t5)(_context19.t6);
            _context19.next = 20;
            return _context19.t4.awrap.call(_context19.t4, _context19.t7);

          case 20:
          case 'end':
            return _context19.stop();
        }
      }
    }, null, this);
  });

  it('action to contract (contract tr nesting)', function () {
    this.timeout(4000);
    var tn = Eos({ signProvider: signProvider });
    return tn.contract('eosio.token').then(function (eosio_token) {
      return eosio_token.transaction(function (tr) {
        tr.transfer('inita', 'initb', '1.0000 SYS', '');
        tr.transfer('inita', 'initc', '2.0000 SYS', '');
      }).then(function () {
        return eosio_token.transfer('inita', 'initb', '3.0000 SYS', '');
      });
    });
  });

  it('multi-action transaction (broadcast)', function () {
    var eos = Eos({ signProvider: signProvider });
    return eos.transaction(function (tr) {
      assert(tr.transfer('inita', 'initb', '1.0000 SYS', '') == null);
      assert(tr.transfer({ from: 'inita', to: 'initc', quantity: '1.0000 SYS', memo: '' }) == null);
    }).then(function (tr) {
      assert.equal(2, tr.transaction.transaction.actions.length);
    });
  });

  it('multi-action transaction no inner callback', function () {
    var eos = Eos({ signProvider: signProvider });
    return eos.transaction(function (tr) {
      tr.transfer('inita', 'inita', '1.0000 SYS', '', function (cb) {});
    }).then(function () {
      throw 'expecting rollback';
    }).catch(function (error) {
      assert(/Callback during a transaction/.test(error), error);
    });
  });

  it('multi-action transaction error rollback', function () {
    var eos = Eos({ signProvider: signProvider });
    return eos.transaction(function (tr) {
      throw 'rollback';
    }).then(function () {
      throw 'expecting rollback';
    }).catch(function (error) {
      assert(/rollback/.test(error), error);
    });
  });

  it('multi-action transaction Promise.reject rollback', function () {
    var eos = Eos({ signProvider: signProvider });
    return eos.transaction(function (tr) {
      return Promise.reject('rollback');
    }).then(function () {
      throw 'expecting rollback';
    }).catch(function (error) {
      assert(/rollback/.test(error), error);
    });
  });

  it('custom transaction', function () {
    var eos = Eos({ signProvider: signProvider });
    return eos.transaction({
      actions: [{
        account: 'eosio.token',
        name: 'transfer',
        data: {
          from: 'inita',
          to: 'initb',
          quantity: '13.0000 SYS',
          memo: '爱'
        },
        authorization: [{
          actor: 'inita',
          permission: 'active'
        }]
      }]
    }, { broadcast: false });
  });

  it('custom contract transfer', function _callee20() {
    var eos;
    return _regenerator2.default.async(function _callee20$(_context20) {
      while (1) {
        switch (_context20.prev = _context20.next) {
          case 0:
            eos = Eos({ signProvider: signProvider });
            _context20.next = 3;
            return _regenerator2.default.awrap(eos.contract('currency').then(function (currency) {
              return currency.transfer('currency', 'inita', '1.0000 CUR', '');
            }));

          case 3:
          case 'end':
            return _context20.stop();
        }
      }
    }, null, this);
  });
});

it('Transaction ABI cache', function _callee21() {
  var eos, abi;
  return _regenerator2.default.async(function _callee21$(_context21) {
    while (1) {
      switch (_context21.prev = _context21.next) {
        case 0:
          eos = Eos();

          assert.throws(function () {
            return eos.fc.abiCache.abi('eosio.msig');
          }, /not cached/);
          _context21.next = 4;
          return _regenerator2.default.awrap(eos.fc.abiCache.abiAsync('eosio.msig'));

        case 4:
          abi = _context21.sent;
          _context21.t0 = assert;
          _context21.t1 = abi;
          _context21.next = 9;
          return _regenerator2.default.awrap(eos.fc.abiCache.abiAsync('eosio.msig', false /*force*/));

        case 9:
          _context21.t2 = _context21.sent;

          _context21.t0.deepEqual.call(_context21.t0, _context21.t1, _context21.t2);

          assert.deepEqual(abi, eos.fc.abiCache.abi('eosio.msig'));

        case 12:
        case 'end':
          return _context21.stop();
      }
    }
  }, null, this);
});

it('Transaction ABI lookup', function _callee22() {
  var eos, tx;
  return _regenerator2.default.async(function _callee22$(_context22) {
    while (1) {
      switch (_context22.prev = _context22.next) {
        case 0:
          eos = Eos();
          _context22.next = 3;
          return _regenerator2.default.awrap(eos.transaction({
            actions: [{
              account: 'currency',
              name: 'transfer',
              data: {
                from: 'inita',
                to: 'initb',
                quantity: '13.0000 CUR',
                memo: ''
              },
              authorization: [{
                actor: 'inita',
                permission: 'active'
              }]
            }]
          }, { sign: false, broadcast: false }));

        case 3:
          tx = _context22.sent;

          assert.equal(tx.transaction.transaction.actions[0].account, 'currency');

        case 5:
        case 'end':
          return _context22.stop();
      }
    }
  }, null, this);
});

var randomName = function randomName() {
  var name = String(Math.round(Math.random() * 1000000000)).replace(/[0,6-9]/g, '');
  return 'a' + name + '111222333444'.substring(0, 11 - name.length); // always 12 in length
};

var randomAsset = function randomAsset() {
  return ecc.sha256(String(Math.random())).toUpperCase().replace(/[^A-Z]/g, '').substring(0, 7);
};