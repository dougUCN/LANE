from gqlComms import listHistograms, createHistogram, deleteHistogram, getHistogram, toSvgCoords, dump_response
import numpy as np
import datetime
import argparse
import copy


def test_allFuncs():
    NUM = 100
    LENGTH = 50
    LOW = 0
    HIGH = 1000
    rng = np.random.default_rng()
    now = datetime.datetime.now()
    runHeader = now.strftime("%Y%m%d_run")
    x = np.arange(LENGTH)
    y = rng.integers(low=LOW, high=HIGH, size=LENGTH)

    currentHists, response = listHistograms(isLive=False)
    new_id = np.amax(currentHists) + 1

    params = {
        'id': new_id,
        'data': toSvgCoords(x, y),
        'xrange': {'min': x[0], 'max': x[-1]},
        'yrange': {'min': LOW, 'max': HIGH},
        'name': f'{runHeader}{new_id}',
        'type': 'static_test',
        'isLive': False,
    }
    createHistogram(**params)

    try:
        histogramData = getHistogram(new_id).get('data').get('getHistogram')
    except error as e:
        raise KeyError(e)

    overlap = list(set(params.keys()) & set(histogramData.keys()))

    inputDict = copy.copy(params)
    responseDict = copy.copy(histogramData)

    if overlap.len() == 0:
        raise KeyError("error, No overlapping Keys input and response are different!")

    for key in responseDict.keys():
        if key not in overlap:
            del histogramData[key]

    for key in inputDict.keys():
        if key not in overlap:
            del params[key]

    if histogramData != params:
        raise ValueError("error, Data does not match!")

    deleteHistogram(new_id, False)

    assert np.amax(currentHists) != new_id
