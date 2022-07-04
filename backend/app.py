import json
import os
from datetime import timedelta
from flask import Flask, request, session

from crawler import Crawler591, CrawlerDDRoom
from house_item import HouseItem
from filters.filter_item import FilterItem

app = Flask(__name__)
app.secret_key = b'4fjlkjaie3r334feaadw'


@app.route('/api/data', methods=['GET', 'POST'])
def data():
    raw = session.get('filter')
    if raw is None:
        raise Exception('Filter is not available.')

    filters = FilterItem.from_dict(raw)
    data = list()
    if 'src-591' in raw.get('src'):
        pass
    if 'src-ddroom' in raw.get('src'):
        craw_ddroom = CrawlerDDRoom()
        craw_ddroom.get(filters)
        data.extend(craw_ddroom.fetch())

    return json.dumps(data)


@app.route('/api/filters', methods=['GET', 'POST'])
def filter():
    if request.method == 'POST':
        data = request.get_json()
        session['filter'] = data.copy()

    return session.get('filter')


if __name__ == '__main__':
    app.run()
