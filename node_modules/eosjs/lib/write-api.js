'use strict';

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var assert = require('assert');
var ecc = require('eosjs-ecc');
var Fcbuffer = require('fcbuffer');
var createHash = require('create-hash');

var _require = require('eosjs-api'),
    processArgs = _require.processArgs;

var Structs = require('./structs');

module.exports = writeApiGen;

var sign = ecc.sign;


function writeApiGen(Network, network, structs, config, abis) {
  if (typeof config.chainId !== 'string') {
    throw new TypeError('config.chainId is required');
  }
  var writeApi = WriteApi(Network, network, config, structs.transaction);
  var reserveFunctions = new Set(['transaction', 'contract']);

  var merge = {};
  // sends transactions, can act as an action collecting wrapper
  merge.transaction = writeApi.genTransaction(structs, merge);

  // Immediate send operations automatically calls merge.transaction
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = abis[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var abi = _step.value;

      for (var type in abi.schema) {
        var typeStruct = abi.schema[type];
        if (typeof typeStruct === 'string') {
          // skip types like; name, account_name, etc..
          continue;
        }

        assert.equal(typeof typeStruct === 'undefined' ? 'undefined' : (0, _typeof3.default)(typeStruct), 'object', 'abi.schema[type = ' + type + ']');

        var action = typeStruct.action;

        if (action === undefined) {
          // ABI private struct
          continue;
        }

        if (reserveFunctions.has(action.name)) {
          throw new TypeError('Conflicting Api function: ' + type);
        }

        var definition = schemaFields(abi.schema, type);
        merge[action.name] = writeApi.genMethod(type, definition, merge.transaction, action.account, action.name);
      }
    }

    /**
      Immedate send contract actions.
       @example eos.contract('mycontract', [options], [callback])
      @example eos.contract('mycontract').then(mycontract => mycontract.myaction(...))
    */
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  merge.contract = function () {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var _processArgs = processArgs(args, ['account'], 'contract', optionsFormatter),
        params = _processArgs.params,
        options = _processArgs.options,
        returnPromise = _processArgs.returnPromise,
        callback = _processArgs.callback;

    var account = params.account;

    // sends transactions via its own transaction function

    writeApi.genContractActions(account).then(function (r) {
      callback(null, r);
    }).catch(function (r) {
      callback(r);
    });

    return returnPromise;
  };

  return merge;
}

function WriteApi(Network, network, config, Transaction) {
  /**
    @arg {array} [args.contracts]
    @arg {callback|object} args.transaction tr => {tr.transfer .. }
    @arg {object} [args.options]
    @arg {function} [args.callback]
  */
  var genTransaction = function genTransaction(structs, merge) {
    return function _callee() {
      for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      var contracts, options, callback, isContractArray, accounts, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, action, abiPromises, cachedCode, arg, contractPromises, _iteratorNormalCompletion3, _didIteratorError3, _iteratorError3, _iterator3, _step3, account;

      return _regenerator2.default.async(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              contracts = void 0, options = void 0, callback = void 0;


              if (args[args.length - 1] == null) {
                // callback may be undefined
                args = args.slice(0, args.length - 1);
              }

              isContractArray = isStringArray(args[0]);

              if (!isContractArray) {
                _context.next = 8;
                break;
              }

              contracts = args[0];
              args = args.slice(1);
              _context.next = 39;
              break;

            case 8:
              if (!(typeof args[0] === 'string')) {
                _context.next = 13;
                break;
              }

              contracts = [args[0]];
              args = args.slice(1);
              _context.next = 39;
              break;

            case 13:
              if (!((0, _typeof3.default)(args[0]) === 'object' && Array.isArray(args[0].actions))) {
                _context.next = 39;
                break;
              }

              // full transaction, lookup ABIs used by each action
              accounts = new Set(); // make a unique list

              // TODO: Add args[0].context_free_actions to accounts too?

              _iteratorNormalCompletion2 = true;
              _didIteratorError2 = false;
              _iteratorError2 = undefined;
              _context.prev = 18;
              for (_iterator2 = args[0].actions[Symbol.iterator](); !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                action = _step2.value;

                accounts.add(action.account);
              }

              _context.next = 26;
              break;

            case 22:
              _context.prev = 22;
              _context.t0 = _context['catch'](18);
              _didIteratorError2 = true;
              _iteratorError2 = _context.t0;

            case 26:
              _context.prev = 26;
              _context.prev = 27;

              if (!_iteratorNormalCompletion2 && _iterator2.return) {
                _iterator2.return();
              }

            case 29:
              _context.prev = 29;

              if (!_didIteratorError2) {
                _context.next = 32;
                break;
              }

              throw _iteratorError2;

            case 32:
              return _context.finish(29);

            case 33:
              return _context.finish(26);

            case 34:
              abiPromises = [];

              // Eos contract operations are cached (efficient and offline transactions)

              cachedCode = new Set(['eosio', 'eosio.token', 'eosio.null']);

              accounts.forEach(function (account) {
                if (!cachedCode.has(account)) {
                  abiPromises.push(config.abiCache.abiAsync(account));
                }
              });
              _context.next = 39;
              return _regenerator2.default.awrap(Promise.all(abiPromises));

            case 39:

              if (args.length > 1 && typeof args[args.length - 1] === 'function') {
                callback = args.pop();
              }

              if (args.length > 1 && (0, _typeof3.default)(args[args.length - 1]) === 'object') {
                options = args.pop();
              }

              assert.equal(args.length, 1, 'transaction args: contracts<string|array>, transaction<callback|object>, [options], [callback]');
              arg = args[0];

              if (!contracts) {
                _context.next = 67;
                break;
              }

              assert(!callback, 'callback with contracts are not supported');
              assert.equal('function', typeof arg === 'undefined' ? 'undefined' : (0, _typeof3.default)(arg), 'provide function callback following contracts array parameter');

              contractPromises = [];
              _iteratorNormalCompletion3 = true;
              _didIteratorError3 = false;
              _iteratorError3 = undefined;
              _context.prev = 50;

              for (_iterator3 = contracts[Symbol.iterator](); !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                account = _step3.value;

                // setup wrapper functions to collect contract api calls
                contractPromises.push(genContractActions(account, merge.transaction));
              }

              _context.next = 58;
              break;

            case 54:
              _context.prev = 54;
              _context.t1 = _context['catch'](50);
              _didIteratorError3 = true;
              _iteratorError3 = _context.t1;

            case 58:
              _context.prev = 58;
              _context.prev = 59;

              if (!_iteratorNormalCompletion3 && _iterator3.return) {
                _iterator3.return();
              }

            case 61:
              _context.prev = 61;

              if (!_didIteratorError3) {
                _context.next = 64;
                break;
              }

              throw _iteratorError3;

            case 64:
              return _context.finish(61);

            case 65:
              return _context.finish(58);

            case 66:
              return _context.abrupt('return', Promise.all(contractPromises).then(function (actions) {
                var merges = {};
                actions.forEach(function (m, i) {
                  merges[contracts[i]] = m;
                });
                var param = isContractArray ? merges : merges[contracts[0]];
                // collect and invoke api calls
                return trMessageCollector(arg, options, param);
              }));

            case 67:
              if (!(typeof arg === 'function')) {
                _context.next = 69;
                break;
              }

              return _context.abrupt('return', trMessageCollector(arg, options, merge));

            case 69:
              if (!((typeof arg === 'undefined' ? 'undefined' : (0, _typeof3.default)(arg)) === 'object')) {
                _context.next = 71;
                break;
              }

              return _context.abrupt('return', transaction(arg, options, callback));

            case 71:
              throw new Error('first transaction argument unrecognized', arg);

            case 72:
            case 'end':
              return _context.stop();
          }
        }
      }, null, this, [[18, 22, 26, 34], [27,, 29, 33], [50, 54, 58, 66], [59,, 61, 65]]);
    };
  };

  function genContractActions(account) {
    var transaction = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

    return config.abiCache.abiAsync(account).then(function (cache) {
      assert(Array.isArray(cache.abi.actions) && cache.abi.actions.length, 'No actions');

      var contractMerge = {};
      contractMerge.transaction = transaction ? transaction : genTransaction(cache.structs, contractMerge);

      cache.abi.actions.forEach(function (_ref) {
        var name = _ref.name,
            type = _ref.type;

        var definition = schemaFields(cache.schema, type);
        contractMerge[name] = genMethod(type, definition, contractMerge.transaction, account, name);
      });

      contractMerge.fc = cache;

      return contractMerge;
    });
  }

  function genMethod(type, definition, transactionArg) {
    var account = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'eosio.token';
    var name = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : type;

    return function () {
      for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        args[_key3] = arguments[_key3];
      }

      if (args.length === 0) {
        console.log(usage({ name: name, type: type }, definition, Network, account, config));
        return;
      }

      // Special case like multi-action transactions where this lib needs
      // to be sure the broadcast is off.
      var optionOverrides = {};
      var lastArg = args[args.length - 1];
      if ((typeof lastArg === 'undefined' ? 'undefined' : (0, _typeof3.default)(lastArg)) === 'object' && (0, _typeof3.default)(lastArg.__optionOverrides) === 'object') {
        // pop() fixes the args.length
        Object.assign(optionOverrides, args.pop().__optionOverrides);
      }

      var processedArgs = processArgs(args, Object.keys(definition), type, optionsFormatter);

      var options = processedArgs.options;
      var params = processedArgs.params,
          returnPromise = processedArgs.returnPromise,
          callback = processedArgs.callback;


      var optionDefaults = { // From config and configDefaults
        broadcast: config.broadcast,
        sign: config.sign

        // internal options (ex: multi-action transaction)
      };options = Object.assign({}, optionDefaults, options, optionOverrides);
      if (optionOverrides.noCallback && !returnPromise) {
        throw new Error('Callback during a transaction are not supported');
      }

      var authorization = [];
      var providedAuth = options.authorization ? options.authorization : config.authorization;
      var addDefaultAuths = providedAuth == null;

      // Often if the first field in an action is an account name it is
      // also the required authorization.
      function firstAccount() {
        var fieldKeys = Object.keys(definition);
        var f1 = fieldKeys[0];

        if (definition[f1] === 'account_name') {
          return params[f1];
        }
      }

      if (providedAuth) {
        var authArray = void 0;
        if (typeof providedAuth === 'string') {
          authArray = [providedAuth];
        } else if (Array.isArray(providedAuth)) {
          authArray = providedAuth;
        }

        if (authArray) {
          authArray.forEach(function (auth) {
            if (typeof auth === 'string') {
              var _auth$split = auth.split('@'),
                  _auth$split2 = (0, _slicedToArray3.default)(_auth$split, 2),
                  actor = _auth$split2[0],
                  _auth$split2$ = _auth$split2[1],
                  permission = _auth$split2$ === undefined ? 'active' : _auth$split2$;

              if (actor === '') {
                actor = firstAccount();
              }
              if (actor) {
                authorization.push({ actor: actor, permission: permission });
              }
            } else if ((typeof auth === 'undefined' ? 'undefined' : (0, _typeof3.default)(auth)) === 'object') {
              authorization.push(auth);
            }
          });
        }

        assert.equal(authorization.length, authArray.length, 'invalid authorization in: ' + JSON.stringify(providedAuth));
      }

      var tr = {
        actions: [{
          account: account,
          name: name,
          authorization: authorization,
          data: params
        }]
      };

      if (addDefaultAuths) {
        var actor = firstAccount();
        if (actor) {
          // Default authorization (since user did not provide one)
          tr.actions[0].authorization.push({
            actor: actor,
            permission: 'active'
          });
        }
      }

      tr.actions[0].authorization.sort(function (a, b) {
        return a.actor > b.actor ? 1 : a.actor < b.actor ? -1 : 0;
      });

      // multi-action transaction support
      if (!optionOverrides.messageOnly) {
        transactionArg(tr, options, callback);
      } else {
        callback(null, tr);
      }

      return returnPromise;
    };
  }

  /**
    Transaction Message Collector
     Wrap merge.functions adding optionOverrides that will suspend
    transaction broadcast.
  */
  function trMessageCollector(trCallback) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var merges = arguments[2];

    assert.equal('function', typeof trCallback === 'undefined' ? 'undefined' : (0, _typeof3.default)(trCallback), 'trCallback');
    assert.equal('object', typeof options === 'undefined' ? 'undefined' : (0, _typeof3.default)(options), 'options');
    assert.equal('object', typeof merges === 'undefined' ? 'undefined' : (0, _typeof3.default)(merges), 'merges');
    assert(!Array.isArray(merges), 'merges should not be an array');
    assert.equal('function', typeof transaction === 'undefined' ? 'undefined' : (0, _typeof3.default)(transaction), 'transaction');

    var messageList = [];
    var messageCollector = {};

    var wrap = function wrap(opFunction) {
      return function () {
        for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
          args[_key4] = arguments[_key4];
        }

        // call the original function but force-disable a lot of stuff
        var ret = opFunction.apply(undefined, args.concat([{
          __optionOverrides: {
            broadcast: false,
            messageOnly: true,
            noCallback: true
          }
        }]));
        if (ret == null) {
          // double-check (code can change)
          throw new Error('Callbacks can not be used when creating a multi-action transaction');
        }
        messageList.push(ret);
      };
    };

    // merges can be an object of functions (as in the main eos contract)
    // or an object of contract names with functions under those
    for (var key in merges) {
      var value = merges[key];
      var variableName = key.replace(/\./, '_');
      if (typeof value === 'function') {
        // Native operations (eos contract for example)
        messageCollector[variableName] = wrap(value);
      } else if ((typeof value === 'undefined' ? 'undefined' : (0, _typeof3.default)(value)) === 'object') {
        // other contract(s) (currency contract for example)
        if (messageCollector[variableName] == null) {
          messageCollector[variableName] = {};
        }
        for (var key2 in value) {
          if (key2 === 'transaction') {
            continue;
          }
          messageCollector[variableName][key2] = wrap(value[key2]);
        }
      }
    }

    var promiseCollector = void 0;
    try {
      // caller will load this up with actions
      promiseCollector = trCallback(messageCollector);
    } catch (error) {
      promiseCollector = Promise.reject(error);
    }

    return Promise.resolve(promiseCollector).then(function () {
      return Promise.all(messageList).then(function (resolvedMessageList) {
        var actions = [];
        var _iteratorNormalCompletion4 = true;
        var _didIteratorError4 = false;
        var _iteratorError4 = undefined;

        try {
          for (var _iterator4 = resolvedMessageList[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
            var m = _step4.value;

            var _m$actions = (0, _slicedToArray3.default)(m.actions, 1),
                action = _m$actions[0];

            actions.push(action);
          }
        } catch (err) {
          _didIteratorError4 = true;
          _iteratorError4 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion4 && _iterator4.return) {
              _iterator4.return();
            }
          } finally {
            if (_didIteratorError4) {
              throw _iteratorError4;
            }
          }
        }

        var trObject = {};
        trObject.actions = actions;
        return transaction(trObject, options);
      });
    });
  }

  function transaction(arg, options, callback) {
    var defaultExpiration, optionDefault, returnPromise, superCallback, rawTx, _arr, _i, txField, txObject, buf, tr, transactionId, sigs, chainIdBuf, packedContextFreeData, signBuf;

    return _regenerator2.default.async(function transaction$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            defaultExpiration = config.expireInSeconds ? config.expireInSeconds : 60;
            optionDefault = { expireInSeconds: defaultExpiration, broadcast: true, sign: true };

            options = Object.assign({} /*clone*/, optionDefault, options);

            returnPromise = void 0;

            if (typeof callback !== 'function') {
              returnPromise = new Promise(function (resolve, reject) {
                callback = function callback(err, result) {
                  if (err) {
                    reject(err);
                  } else {
                    resolve(result);
                  }
                };
              });
            }

            if (!((typeof arg === 'undefined' ? 'undefined' : (0, _typeof3.default)(arg)) !== 'object')) {
              _context4.next = 7;
              break;
            }

            throw new TypeError('First transaction argument should be an object or function');

          case 7:
            if (Array.isArray(arg.actions)) {
              _context4.next = 9;
              break;
            }

            throw new TypeError('Expecting actions array');

          case 9:

            if (config.logger.log || config.logger.error) {
              // wrap the callback with the logger
              superCallback = callback;

              callback = function callback(error, tr) {
                if (error && config.logger.error) {
                  config.logger.error(error);
                }
                if (config.logger.log) {
                  config.logger.log(JSON.stringify(tr));
                }
                superCallback(error, tr);
              };
            }

            arg.actions.forEach(function (action) {
              if (!Array.isArray(action.authorization)) {
                throw new TypeError('Expecting action.authorization array', action);
              }
            });

            if (!(options.sign && typeof config.signProvider !== 'function')) {
              _context4.next = 13;
              break;
            }

            throw new TypeError('Expecting config.signProvider function (disable using {sign: false})');

          case 13:
            rawTx = {
              max_net_usage_words: 0,
              max_cpu_usage_ms: 0,
              delay_sec: 0,
              context_free_actions: [],
              actions: [],
              signatures: [],
              transaction_extensions: []

              // global transaction headers
            };

            if (!config.transactionHeaders) {
              _context4.next = 25;
              break;
            }

            if (!((0, _typeof3.default)(config.transactionHeaders) === 'object')) {
              _context4.next = 19;
              break;
            }

            Object.assign(rawTx, config.transactionHeaders);
            _context4.next = 25;
            break;

          case 19:
            if (!(typeof config.transactionHeaders === 'function')) {
              _context4.next = 24;
              break;
            }

            _context4.next = 22;
            return _regenerator2.default.awrap(config.transactionHeaders(options.expireInSeconds, checkError(callback, config.logger, function _callee2(headers) {
              return _regenerator2.default.async(function _callee2$(_context2) {
                while (1) {
                  switch (_context2.prev = _context2.next) {
                    case 0:
                      assert.equal(typeof headers === 'undefined' ? 'undefined' : (0, _typeof3.default)(headers), 'object', 'expecting transaction header object');
                      Object.assign(rawTx, headers);

                    case 2:
                    case 'end':
                      return _context2.stop();
                  }
                }
              }, null, this);
            })));

          case 22:
            _context4.next = 25;
            break;

          case 24:
            assert(false, 'config.transactionHeaders should be an object or function');

          case 25:

            // per transaction headers
            _arr = ['expiration', 'ref_block_num', 'ref_block_prefix', 'delay_sec', 'max_net_usage_words', 'max_cpu_usage_ms'];
            for (_i = 0; _i < _arr.length; _i++) {
              txField = _arr[_i];

              if (arg[txField] !== undefined) {
                // eos.transaction('eosio', eosio => { eosio.myaction(..) }, {delay_sec: 369})
                // eos.transaction({delay_sec: 369, actions: [...]})
                rawTx[txField] = arg[txField];
              } else if (options[txField] !== undefined) {
                // eos.transaction(tr => {tr.transfer(...)}, {delay_sec: 369})
                rawTx[txField] = options[txField];
              }
            }

            // eosjs calcualted headers

            if (!( // minimum required headers
            rawTx.expiration === undefined || rawTx.ref_block_num === undefined || rawTx.ref_block_prefix === undefined)) {
              _context4.next = 31;
              break;
            }

            assert(network, 'Network is required, provide httpEndpoint or own transaction headers');
            _context4.next = 31;
            return _regenerator2.default.awrap(new Promise(function (resolve) {
              network.createTransaction(options.expireInSeconds, checkError(callback, config.logger, function _callee3(headers) {
                var _arr2, _i2, txField;

                return _regenerator2.default.async(function _callee3$(_context3) {
                  while (1) {
                    switch (_context3.prev = _context3.next) {
                      case 0:
                        _arr2 = ['expiration', 'ref_block_num', 'ref_block_prefix'];

                        for (_i2 = 0; _i2 < _arr2.length; _i2++) {
                          txField = _arr2[_i2];

                          // console.log(txField, headers[txField]);
                          if (rawTx[txField] === undefined) {
                            rawTx[txField] = headers[txField];
                          }
                        }
                        resolve();

                      case 3:
                      case 'end':
                        return _context3.stop();
                    }
                  }
                }, null, this);
              }));
            }));

          case 31:

            // console.log('rawTx', rawTx)

            assert.equal((0, _typeof3.default)(rawTx.expiration), 'string', 'expecting expiration: iso date time string');
            assert.equal((0, _typeof3.default)(rawTx.ref_block_num), 'number', 'expecting ref_block_num number');
            assert.equal((0, _typeof3.default)(rawTx.ref_block_prefix), 'number', 'expecting ref_block_prefix number');

            rawTx.context_free_actions = arg.context_free_actions;
            rawTx.actions = arg.actions;
            rawTx.transaction_extensions = arg.transaction_extensions;

            // Resolve shorthand
            txObject = Transaction.fromObject(rawTx);
            // console.log('txObject', txObject)

            buf = Fcbuffer.toBuffer(Transaction, txObject);
            tr = Transaction.toObject(txObject);
            transactionId = createHash('sha256').update(buf).digest().toString('hex');
            sigs = [];

            if (options.sign) {
              chainIdBuf = Buffer.from(config.chainId, 'hex');
              packedContextFreeData = Buffer.from(new Uint8Array(32)); // TODO

              signBuf = Buffer.concat([chainIdBuf, buf, packedContextFreeData]);


              sigs = config.signProvider({ transaction: tr, buf: signBuf, sign: sign,
                optionsKeyProvider: options.keyProvider });

              if (!Array.isArray(sigs)) {
                sigs = [sigs];
              }
            }

            // sigs can be strings or Promises
            Promise.all(sigs).then(function (sigs) {
              sigs = [].concat.apply([], sigs); // flatten arrays in array

              for (var i = 0; i < sigs.length; i++) {
                var sig = sigs[i];
                // normalize (hex to base58 format for example)
                if (typeof sig === 'string' && sig.length === 130) {
                  sigs[i] = ecc.Signature.from(sig).toString();
                }
              }

              var packedTr = {
                compression: 'none',
                transaction: tr,
                signatures: sigs
              };

              var mock = config.mockTransactions ? config.mockTransactions() : null;
              if (mock != null) {
                assert(/pass|fail/.test(mock), 'mockTransactions should return a string: pass or fail');
                if (mock === 'pass') {
                  callback(null, {
                    transaction_id: transactionId,
                    mockTransaction: true,
                    broadcast: false,
                    transaction: packedTr
                  });
                }
                if (mock === 'fail') {
                  var error = '[push_transaction mock error] \'fake error\', digest \'' + buf.toString('hex') + '\'';

                  if (config.logger.error) {
                    config.logger.error(error);
                  }

                  callback(error);
                }
                return;
              }

              if (!options.broadcast || !network) {
                callback(null, {
                  transaction_id: transactionId,
                  broadcast: false,
                  transaction: packedTr
                });
              } else {
                network.pushTransaction(packedTr, function (error, processedTransaction) {
                  if (!error) {
                    callback(null, Object.assign({
                      broadcast: true,
                      transaction: packedTr,
                      transaction_id: transactionId
                    }, processedTransaction));
                  } else {
                    if (config.logger.error) {
                      config.logger.error('[push_transaction error] \'' + error.message + '\', transaction \'' + buf.toString('hex') + '\'');
                    }
                    callback(error.message);
                  }
                });
              }
            }).catch(function (error) {
              if (config.logger.error) {
                config.logger.error(error);
              }
              callback(error);
            });
            return _context4.abrupt('return', returnPromise);

          case 45:
          case 'end':
            return _context4.stop();
        }
      }
    }, null, this);
  }

  // return WriteApi
  return {
    genTransaction: genTransaction,
    genContractActions: genContractActions,
    genMethod: genMethod
  };
}

var isStringArray = function isStringArray(o) {
  return Array.isArray(o) && o.length > 0 && o.findIndex(function (o) {
    return typeof o !== 'string';
  }) === -1;
};

// Normalize the extra optional options argument
var optionsFormatter = function optionsFormatter(option) {
  if ((typeof option === 'undefined' ? 'undefined' : (0, _typeof3.default)(option)) === 'object') {
    return option; // {debug, broadcast, etc} (etc my overwrite tr below)
  }
  if (typeof option === 'boolean') {
    // broadcast argument as a true false value, back-end cli will use this shorthand
    return { broadcast: option };
  }
};

function usage(action, definition, Network, account, config) {
  var usage = '';
  var out = function out() {
    var str = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

    usage += str + '\n';
  };
  out('CONTRACT');
  out(account);
  out();

  out('ACTION');
  out(action.name);
  out();

  var cache = config.abiCache.abi(account);

  out('PARAMETERS');
  out(JSON.stringify(schemaFields(cache.schema, action.type), null, 4));
  out();

  var struct = cache.structs[action.type];

  out('EXAMPLE');
  out(account + '.' + action.name + '(' + JSON.stringify(struct.toObject(), null, 4) + ')');

  return usage;
}

var checkError = function checkError(parentErr, logger, parrentRes) {
  return function (error, result) {
    if (error) {
      if (logger.error) {
        logger.error('error', error);
      }
      parentErr(error);
    } else {
      Promise.resolve(parrentRes(result)).catch(function (error) {
        parentErr(error);
      });
    }
  };
};

/** Collapse inheritance (via "base") putting all the fields in one object. */
function schemaFields(schema, type) {
  var _schema$type = schema[type],
      base = _schema$type.base,
      fields = _schema$type.fields;

  var def = {};
  if (base && base !== '') {
    Object.assign(def, schemaFields(schema, base));
  }
  Object.assign(def, fields);
  return def;
}