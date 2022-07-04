from dataclasses import dataclass
from typing import Dict, Iterable


@dataclass
class FilterItem:
    # TODO: check if the filter make sense or not, eg. price_min <= price_max

    # location
    city: str
    section: str

    # price
    price_min: int
    price_max: int

    # htype
    # space: str
    # tags: Iterable

    @classmethod
    def from_dict(cls, raw: Dict):
        return cls(
            city=raw.get('city'),
            section=raw.get('section'),
            price_min=raw.get('priceMin'),
            price_max=raw.get('priceMax')
        )

    def to_591():
        return dict()

    def to_ddroom(self):
        return dict(
            city=self.city,
            area=self.section,
            min_rent=self.price_min,
            max_rent=self.price_max
        )

    def to_rakuya():
        return dict()
