const createSymbol = name => `@@redux-saga/${name}`;

const CANCEL =
/*#__PURE__*/
createSymbol('CANCEL_PROMISE');
const CHANNEL_END_TYPE =
/*#__PURE__*/
createSymbol('CHANNEL_END');
const IO =
/*#__PURE__*/
createSymbol('IO');
const MATCH =
/*#__PURE__*/
createSymbol('MATCH');
const MULTICAST =
/*#__PURE__*/
createSymbol('MULTICAST');
const SAGA_ACTION =
/*#__PURE__*/
createSymbol('SAGA_ACTION');
const SELF_CANCELLATION =
/*#__PURE__*/
createSymbol('SELF_CANCELLATION');
const TASK =
/*#__PURE__*/
createSymbol('TASK');
const TASK_CANCEL =
/*#__PURE__*/
createSymbol('TASK_CANCEL');
const TERMINATE =
/*#__PURE__*/
createSymbol('TERMINATE');
const SAGA_LOCATION =
/*#__PURE__*/
createSymbol('LOCATION');

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

const undef = v => v === null || v === undefined;
const notUndef = v => v !== null && v !== undefined;
const func = f => typeof f === 'function';
const string = s => typeof s === 'string';
const array = Array.isArray;
const object = obj => obj && !array(obj) && typeof obj === 'object';
const promise = p => p && func(p.then);
const iterator = it => it && func(it.next) && func(it.throw);
const task = t => t && t[TASK];
const buffer = buf => buf && func(buf.isEmpty) && func(buf.take) && func(buf.put);
const pattern = pat => pat && (string(pat) || symbol(pat) || func(pat) || array(pat) && pat.every(pattern));
const channel = ch => ch && func(ch.take) && func(ch.close);
const stringableFunc = f => func(f) && f.hasOwnProperty('toString');
const symbol = sym => Boolean(sym) && typeof Symbol === 'function' && sym.constructor === Symbol && sym !== Symbol.prototype;
const multicast = ch => channel(ch) && ch[MULTICAST];

const konst = v => () => v;
const kTrue =
/*#__PURE__*/
konst(true);
const noop = () => {};
const identity = v => v;
const hasSymbol = typeof Symbol === 'function';
const asyncIteratorSymbol = hasSymbol && Symbol.asyncIterator ? Symbol.asyncIterator : '@@asyncIterator';
function check(value, predicate, error) {
  if (!predicate(value)) {
    throw new Error(error);
  }
}
const assignWithSymbols = (target, source) => {
  _extends(target, source);

  if (Object.getOwnPropertySymbols) {
    Object.getOwnPropertySymbols(source).forEach(s => {
      target[s] = source[s];
    });
  }
};
const flatMap = (mapper, arr) => [].concat(...arr.map(mapper));
function remove(array, item) {
  const index = array.indexOf(item);

  if (index >= 0) {
    array.splice(index, 1);
  }
}
function once(fn) {
  let called = false;
  return () => {
    if (called) {
      return;
    }

    called = true;
    fn();
  };
}

const kThrow = err => {
  throw err;
};

const kReturn = value => ({
  value,
  done: true
});

function makeIterator(next, thro, name) {
  if (thro === void 0) {
    thro = kThrow;
  }

  if (name === void 0) {
    name = 'iterator';
  }

  const iterator = {
    meta: {
      name
    },
    next,
    throw: thro,
    return: kReturn,
    isSagaIterator: true
  };

  if (typeof Symbol !== 'undefined') {
    iterator[Symbol.iterator] = () => iterator;
  }

  return iterator;
}
function logError(error, _ref) {
  let sagaStack = _ref.sagaStack;

  /*eslint-disable no-console*/
  console.error(error);
  console.error(sagaStack);
}
const internalErr = err => new Error(`
  redux-saga: Error checking hooks detected an inconsistent state. This is likely a bug
  in redux-saga code and not yours. Thanks for reporting this in the project's github repo.
  Error: ${err}
`);
const createSetContextWarning = (ctx, props) => `${ctx ? ctx + '.' : ''}setContext(props): argument ${props} is not a plain object`;
const FROZEN_ACTION_ERROR = `You can't put (a.k.a. dispatch from saga) frozen actions.
We have to define a special non-enumerable property on those actions for scheduling purposes.
Otherwise you wouldn't be able to communicate properly between sagas & other subscribers (action ordering would become far less predictable).
If you are using redux and you care about this behaviour (frozen actions),
then you might want to switch to freezing actions in a middleware rather than in action creator.
Example implementation:

const freezeActions = store => next => action => next(Object.freeze(action))
`; // creates empty, but not-holey array

const createEmptyArray = n => Array.apply(null, new Array(n));
const wrapSagaDispatch = dispatch => action => {
  {
    check(action, ac => !Object.isFrozen(ac), FROZEN_ACTION_ERROR);
  }

  return dispatch(Object.defineProperty(action, SAGA_ACTION, {
    value: true
  }));
};
const shouldTerminate = res => res === TERMINATE;
const shouldCancel = res => res === TASK_CANCEL;
const shouldComplete = res => shouldTerminate(res) || shouldCancel(res);
function createAllStyleChildCallbacks(shape, parentCallback) {
  const keys = Object.keys(shape);
  const totalCount = keys.length;

  {
    check(totalCount, c => c > 0, 'createAllStyleChildCallbacks: get an empty array or object');
  }

  let completedCount = 0;
  let completed;
  const results = array(shape) ? createEmptyArray(totalCount) : {};
  const childCallbacks = {};

  function checkEnd() {
    if (completedCount === totalCount) {
      completed = true;
      parentCallback(results);
    }
  }

  keys.forEach(key => {
    const chCbAtKey = (res, isErr) => {
      if (completed) {
        return;
      }

      if (isErr || shouldComplete(res)) {
        parentCallback.cancel();
        parentCallback(res, isErr);
      } else {
        results[key] = res;
        completedCount++;
        checkEnd();
      }
    };

    chCbAtKey.cancel = noop;
    childCallbacks[key] = chCbAtKey;
  });

  parentCallback.cancel = () => {
    if (!completed) {
      completed = true;
      keys.forEach(key => childCallbacks[key].cancel());
    }
  };

  return childCallbacks;
}
function getMetaInfo(fn) {
  return {
    name: fn.name || 'anonymous',
    location: getLocation(fn)
  };
}
function getLocation(instrumented) {
  return instrumented[SAGA_LOCATION];
}

const BUFFER_OVERFLOW = "Channel's Buffer overflow!";
const ON_OVERFLOW_THROW = 1;
const ON_OVERFLOW_DROP = 2;
const ON_OVERFLOW_SLIDE = 3;
const ON_OVERFLOW_EXPAND = 4;
const zeroBuffer = {
  isEmpty: kTrue,
  put: noop,
  take: noop
};

function ringBuffer(limit, overflowAction) {
  if (limit === void 0) {
    limit = 10;
  }

  let arr = new Array(limit);
  let length = 0;
  let pushIndex = 0;
  let popIndex = 0;

  const push = it => {
    arr[pushIndex] = it;
    pushIndex = (pushIndex + 1) % limit;
    length++;
  };

  const take = () => {
    if (length != 0) {
      let it = arr[popIndex];
      arr[popIndex] = null;
      length--;
      popIndex = (popIndex + 1) % limit;
      return it;
    }
  };

  const flush = () => {
    let items = [];

    while (length) {
      items.push(take());
    }

    return items;
  };

  return {
    isEmpty: () => length == 0,
    put: it => {
      if (length < limit) {
        push(it);
      } else {
        let doubledLimit;

        switch (overflowAction) {
          case ON_OVERFLOW_THROW:
            throw new Error(BUFFER_OVERFLOW);

          case ON_OVERFLOW_SLIDE:
            arr[pushIndex] = it;
            pushIndex = (pushIndex + 1) % limit;
            popIndex = pushIndex;
            break;

          case ON_OVERFLOW_EXPAND:
            doubledLimit = 2 * limit;
            arr = flush();
            length = arr.length;
            pushIndex = arr.length;
            popIndex = 0;
            arr.length = doubledLimit;
            limit = doubledLimit;
            push(it);
            break;

          default: // DROP

        }
      }
    },
    take,
    flush
  };
}

const none = () => zeroBuffer;
const fixed = limit => ringBuffer(limit, ON_OVERFLOW_THROW);
const dropping = limit => ringBuffer(limit, ON_OVERFLOW_DROP);
const sliding = limit => ringBuffer(limit, ON_OVERFLOW_SLIDE);
const expanding = initialSize => ringBuffer(initialSize, ON_OVERFLOW_EXPAND);

var buffers = /*#__PURE__*/Object.freeze({
  none: none,
  fixed: fixed,
  dropping: dropping,
  sliding: sliding,
  expanding: expanding
});

const TAKE = 'TAKE';
const PUT = 'PUT';
const ALL = 'ALL';
const RACE = 'RACE';
const CALL = 'CALL';
const CPS = 'CPS';
const FORK = 'FORK';
const JOIN = 'JOIN';
const CANCEL$1 = 'CANCEL';
const SELECT = 'SELECT';
const ACTION_CHANNEL = 'ACTION_CHANNEL';
const CANCELLED = 'CANCELLED';
const FLUSH = 'FLUSH';
const GET_CONTEXT = 'GET_CONTEXT';
const SET_CONTEXT = 'SET_CONTEXT';

var effectTypes = /*#__PURE__*/Object.freeze({
  TAKE: TAKE,
  PUT: PUT,
  ALL: ALL,
  RACE: RACE,
  CALL: CALL,
  CPS: CPS,
  FORK: FORK,
  JOIN: JOIN,
  CANCEL: CANCEL$1,
  SELECT: SELECT,
  ACTION_CHANNEL: ACTION_CHANNEL,
  CANCELLED: CANCELLED,
  FLUSH: FLUSH,
  GET_CONTEXT: GET_CONTEXT,
  SET_CONTEXT: SET_CONTEXT
});

function delayP(ms, val) {
  if (val === void 0) {
    val = true;
  }

  let timeoutId;
  const promise = new Promise(resolve => {
    timeoutId = setTimeout(resolve, ms, val);
  });

  promise[CANCEL] = () => {
    clearTimeout(timeoutId);
  };

  return promise;
}

const TEST_HINT = '\n(HINT: if you are getting this errors in tests, consider using createMockTask from @redux-saga/testing-utils)';

const makeEffect = (type, payload) => ({
  [IO]: true,
  // this property makes all/race distinguishable in generic manner from other effects
  // currently it's not used at runtime at all but it's here to satisfy type systems
  combinator: false,
  type,
  payload
});

const isForkEffect = eff => eff && eff[IO] && eff.type === FORK;

const detach = eff => {
  {
    check(eff, isForkEffect, 'detach(eff): argument must be a fork effect');
  }

  return makeEffect(FORK, _extends({}, eff.payload, {
    detached: true
  }));
};
function take(patternOrChannel, multicastPattern) {
  if (patternOrChannel === void 0) {
    patternOrChannel = '*';
  }

  if (arguments.length) {
    check(arguments[0], notUndef, 'take(patternOrChannel): patternOrChannel is undefined');
  }

  if (pattern(patternOrChannel)) {
    return makeEffect(TAKE, {
      pattern: patternOrChannel
    });
  }

  if (multicast(patternOrChannel) && notUndef(multicastPattern) && pattern(multicastPattern)) {
    return makeEffect(TAKE, {
      channel: patternOrChannel,
      pattern: multicastPattern
    });
  }

  if (channel(patternOrChannel)) {
    return makeEffect(TAKE, {
      channel: patternOrChannel
    });
  }

  {
    throw new Error(`take(patternOrChannel): argument ${patternOrChannel} is not valid channel or a valid pattern`);
  }
}
const takeMaybe = function takeMaybe() {
  const eff = take(...arguments);
  eff.payload.maybe = true;
  return eff;
};
function put(channel$1, action) {
  {
    if (arguments.length > 1) {
      check(channel$1, notUndef, 'put(channel, action): argument channel is undefined');
      check(channel$1, channel, `put(channel, action): argument ${channel$1} is not a valid channel`);
      check(action, notUndef, 'put(channel, action): argument action is undefined');
    } else {
      check(channel$1, notUndef, 'put(action): argument action is undefined');
    }
  }

  if (undef(action)) {
    action = channel$1; // `undefined` instead of `null` to make default parameter work

    channel$1 = undefined;
  }

  return makeEffect(PUT, {
    channel: channel$1,
    action
  });
}
const putResolve = function putResolve() {
  const eff = put(...arguments);
  eff.payload.resolve = true;
  return eff;
};
function all(effects) {
  const eff = makeEffect(ALL, effects);
  eff.combinator = true;
  return eff;
}
function race(effects) {
  const eff = makeEffect(RACE, effects);
  eff.combinator = true;
  return eff;
} // this match getFnCallDescriptor logic

const validateFnDescriptor = (effectName, fnDescriptor) => {
  check(fnDescriptor, notUndef, `${effectName}: argument fn is undefined or null`);

  if (func(fnDescriptor)) {
    return;
  }

  let context = null;
  let fn;

  if (array(fnDescriptor)) {
    context = fnDescriptor[0];
    fn = fnDescriptor[1];
    check(fn, notUndef, `${effectName}: argument of type [context, fn] has undefined or null \`fn\``);
  } else if (object(fnDescriptor)) {
    context = fnDescriptor.context;
    fn = fnDescriptor.fn;
    check(fn, notUndef, `${effectName}: argument of type {context, fn} has undefined or null \`fn\``);
  } else {
    check(fnDescriptor, func, `${effectName}: argument fn is not function`);
    return;
  }

  if (context && string(fn)) {
    check(context[fn], func, `${effectName}: context arguments has no such method - "${fn}"`);
    return;
  }

  check(fn, func, `${effectName}: unpacked fn argument (from [context, fn] or {context, fn}) is not a function`);
};

function getFnCallDescriptor(fnDescriptor, args) {
  let context = null;
  let fn;

  if (func(fnDescriptor)) {
    fn = fnDescriptor;
  } else {
    if (array(fnDescriptor)) {
      context = fnDescriptor[0];
      fn = fnDescriptor[1];
    } else {
      context = fnDescriptor.context;
      fn = fnDescriptor.fn;
    }

    if (context && string(fn) && func(context[fn])) {
      fn = context[fn];
    }
  }

  return {
    context,
    fn,
    args
  };
}

const isNotDelayEffect = fn => fn !== delay;

function call(fnDescriptor) {
  for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  {
    const arg0 = typeof args[0] === 'number' ? args[0] : 'ms';
    check(fnDescriptor, isNotDelayEffect, `instead of writing \`yield call(delay, ${arg0})\` where delay is an effect from \`redux-saga/effects\` you should write \`yield delay(${arg0})\``);
    validateFnDescriptor('call', fnDescriptor);
  }

  return makeEffect(CALL, getFnCallDescriptor(fnDescriptor, args));
}
function apply(context, fn, args) {
  if (args === void 0) {
    args = [];
  }

  const fnDescriptor = [context, fn];

  {
    validateFnDescriptor('apply', fnDescriptor);
  }

  return makeEffect(CALL, getFnCallDescriptor([context, fn], args));
}
function cps(fnDescriptor) {
  {
    validateFnDescriptor('cps', fnDescriptor);
  }

  for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
    args[_key2 - 1] = arguments[_key2];
  }

  return makeEffect(CPS, getFnCallDescriptor(fnDescriptor, args));
}
function fork(fnDescriptor) {
  {
    validateFnDescriptor('fork', fnDescriptor);
  }

  for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
    args[_key3 - 1] = arguments[_key3];
  }

  return makeEffect(FORK, getFnCallDescriptor(fnDescriptor, args));
}
function spawn(fnDescriptor) {
  {
    validateFnDescriptor('spawn', fnDescriptor);
  }

  for (var _len4 = arguments.length, args = new Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
    args[_key4 - 1] = arguments[_key4];
  }

  return detach(fork(fnDescriptor, ...args));
}
function join(taskOrTasks) {
  {
    if (arguments.length > 1) {
      throw new Error('join(...tasks) is not supported any more. Please use join([...tasks]) to join multiple tasks.');
    }

    if (array(taskOrTasks)) {
      taskOrTasks.forEach(t => {
        check(t, task, `join([...tasks]): argument ${t} is not a valid Task object ${TEST_HINT}`);
      });
    } else {
      check(taskOrTasks, task, `join(task): argument ${taskOrTasks} is not a valid Task object ${TEST_HINT}`);
    }
  }

  return makeEffect(JOIN, taskOrTasks);
}
function cancel(taskOrTasks) {
  if (taskOrTasks === void 0) {
    taskOrTasks = SELF_CANCELLATION;
  }

  {
    if (arguments.length > 1) {
      throw new Error('cancel(...tasks) is not supported any more. Please use cancel([...tasks]) to cancel multiple tasks.');
    }

    if (array(taskOrTasks)) {
      taskOrTasks.forEach(t => {
        check(t, task, `cancel([...tasks]): argument ${t} is not a valid Task object ${TEST_HINT}`);
      });
    } else if (taskOrTasks !== SELF_CANCELLATION && notUndef(taskOrTasks)) {
      check(taskOrTasks, task, `cancel(task): argument ${taskOrTasks} is not a valid Task object ${TEST_HINT}`);
    }
  }

  return makeEffect(CANCEL$1, taskOrTasks);
}
function select(selector) {
  if (selector === void 0) {
    selector = identity;
  }

  for (var _len5 = arguments.length, args = new Array(_len5 > 1 ? _len5 - 1 : 0), _key5 = 1; _key5 < _len5; _key5++) {
    args[_key5 - 1] = arguments[_key5];
  }

  if (arguments.length) {
    check(arguments[0], notUndef, 'select(selector, [...]): argument selector is undefined');
    check(selector, func, `select(selector, [...]): argument ${selector} is not a function`);
  }

  return makeEffect(SELECT, {
    selector,
    args
  });
}
/**
  channel(pattern, [buffer])    => creates a proxy channel for store actions
**/

function actionChannel(pattern$1, buffer$1) {
  {
    check(pattern$1, pattern, 'actionChannel(pattern,...): argument pattern is not valid');

    if (arguments.length > 1) {
      check(buffer$1, notUndef, 'actionChannel(pattern, buffer): argument buffer is undefined');
      check(buffer$1, buffer, `actionChannel(pattern, buffer): argument ${buffer$1} is not a valid buffer`);
    }
  }

  return makeEffect(ACTION_CHANNEL, {
    pattern: pattern$1,
    buffer: buffer$1
  });
}
function cancelled() {
  return makeEffect(CANCELLED, {});
}
function flush(channel$1) {
  {
    check(channel$1, channel, `flush(channel): argument ${channel$1} is not valid channel`);
  }

  return makeEffect(FLUSH, channel$1);
}
function getContext(prop) {
  {
    check(prop, string, `getContext(prop): argument ${prop} is not a string`);
  }

  return makeEffect(GET_CONTEXT, prop);
}
function setContext(props) {
  {
    check(props, object, createSetContextWarning(null, props));
  }

  return makeEffect(SET_CONTEXT, props);
}
const delay =
/*#__PURE__*/
call.bind(null, delayP);

export { kTrue as a, string as b, array as c, stringableFunc as d, func as e, symbol as f, CHANNEL_END_TYPE as g, expanding as h, check as i, buffer as j, none as k, once as l, MULTICAST as m, notUndef as n, MATCH as o, remove as p, SAGA_ACTION as q, internalErr as r, CANCEL as s, TAKE as t, PUT as u, ALL as v, RACE as w, CALL as x, CPS as y, FORK as z, JOIN as A, CANCEL$1 as B, SELECT as C, ACTION_CHANNEL as D, CANCELLED as E, FLUSH as F, GET_CONTEXT as G, SET_CONTEXT as H, promise as I, iterator as J, getMetaInfo as K, noop as L, createAllStyleChildCallbacks as M, SELF_CANCELLATION as N, createEmptyArray as O, assignWithSymbols as P, makeIterator as Q, TERMINATE as R, undef as S, shouldComplete as T, flatMap as U, getLocation as V, TASK as W, TASK_CANCEL as X, object as Y, createSetContextWarning as Z, asyncIteratorSymbol as _, shouldCancel as $, shouldTerminate as a0, IO as a1, logError as a2, wrapSagaDispatch as a3, identity as a4, channel as a5, _extends as a6, take as a7, fork as a8, cancel as a9, call as aa, actionChannel as ab, sliding as ac, delay as ad, race as ae, buffers as af, SAGA_LOCATION as ag, detach as ah, effectTypes as ai, takeMaybe as aj, put as ak, putResolve as al, all as am, apply as an, cps as ao, spawn as ap, join as aq, select as ar, cancelled as as, flush as at, getContext as au, setContext as av };
