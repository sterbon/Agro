import {all} from 'redux-saga/effects';
import scatterSaga from './scatter/scatter_saga';

export default function* rootSaga(){
    yield all([
        scatterSaga()
    ]);
}