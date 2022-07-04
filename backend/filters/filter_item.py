import re
from dataclasses import dataclass
from typing import Dict, Iterable

from .map_591 import *
from .utils import *


@dataclass
class FilterItem:
    # TODO: filter validation

    # location
    city: str
    section: str

    # price
    price_min: int
    price_max: int

    # htype: str
    # space: str
    # tags: Iterable

    @classmethod
    def from_dict(cls, raw: Dict):
        price_min, price_max = parse_price(raw.get('price'))

        return cls(
            city=raw.get('city'),
            section=raw.get('section'),
            price_min=price_min,
            price_max=price_max
        )

    # TODO:
    def to_591(self):
        return dict(
        )

    def to_ddroom(self):
        return dict(
            city=self.city,
            area=concate_values(self.section),
            min_rent=self.price_min,
            max_rent=self.price_max
        )

    def to_rakuya():
        return dict()
