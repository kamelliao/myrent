from bs4 import BeautifulSoup
from typing import Dict, List

import click
import requests

from house_item import HouseItem
from filters.filter_item import FilterItem

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.64 Safari/537.36",
}


class Crawler:
    def __init__(
        self,
        host: str,
        api: str
    ):
        self.host = host
        self.api = api

        self._session = requests.Session()
        self._headers = self._set_headers()
        self._result = None
        self._status = None

    def _set_headers(self):
        raise NotImplementedError

    def get(self):
        raise NotImplementedError

    def fetch(self):
        raise NotImplementedError

    def status(self):
        if not self._result:
            click.secho('Error: Data not crawled, call .get() first.')
        else:
            click.secho(f'Status: {self._status}')


class Crawler591(Crawler):
    def __init__(self):
        super().__init__(
            host='https://rent.591.com.tw/',
            api='https://rent.591.com.tw/home/search/rsList?is_format_data=1&is_new_list=1&type=1&'
        )

    def _set_headers(self):
        r = self._session.get(self.host, headers=HEADERS)
        soup = BeautifulSoup(r.text, 'html.parser')
        token = soup.select_one('meta[name="csrf-token"]')

        headers = HEADERS.copy()
        headers['X-CSRF-TOKEN'] = token.get('content')

        return headers

    def get(self, filters: Dict = None, sorters: Dict = None):
        url = self.api
        if filters:
            url += '&'.join([f"{key}={','.join([str(val) for val in value])}" for key,
                            value in filters.items()])
        if sorters:
            url += '&'.join([f"{key}={value}" for key,
                            value in sorters.items()])

        self._result = self._session.get(url, headers=self._headers).json()
        self._status = self._result['status']
        self.status()

    def fetch(self):
        return [HouseItem.from_591(item).to_dict() for item in self._result['data']['data']]


class CrawlerDDRoom(Crawler):
    def __init__(self):
        super().__init__(
            host='https://dd-room.com/',
            api='https://api.dd-room.com/api/v1/search?category=house'
        )

    def _set_headers(self):
        return HEADERS

    def get(
        self,
        filter_item: FilterItem
    ):
        url = self.api

        for key, value in filter_item.to_ddroom().items():
            if not value:
                continue
            url += f"&{key}={value}"

        print(url)

        self._result = self._session.get(url, headers=self._headers).json()
        self._status = self._result['message']
        self.status()

    def fetch(self):
        return [HouseItem.from_ddroom(item).to_dict() for item in self._result['data']['search']['items']]
