from gqlComms import listHistograms, createHistogram, deleteHistogram,getHistogram,getHistograms
import numpy as np
import datetime
import argparse

def test_createHist():
    NUM = 100
    LENGTH = 50
    LOW = 0
    HIGH =1000
    rng = np.random.default_rng()
    now = datetime.datetime.now()
    runHeader = now.strftime("%Y%m%d_run")

    params ={
            'id': 100,
            'x': np.arange(LENGTH).tolist(),
            'y': rng.integers(low=LOW, high=HIGH, size=LENGTH).tolist(), 
            'name': f'{runHeader}{id}', 
            'type': 'static_test', 
            'isLive': False,
        }
    createHistogram( **params )
    assert getHistogram(100)

def test_getHist():
    assert getHistogram(100)

def test_deleteHist():
    assert deleteHistogram(100,False)




    




