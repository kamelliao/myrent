import re
from dataclasses import dataclass, asdict
from typing import ClassVar, Dict, List, Union, Optional


@dataclass
class HouseItem:
    src: str
    pid: str
    url: str

    title: str
    price: int
    htype: str

    photo: List[str]
    location: Dict[str, str]
    rooms: Dict[str, int]
    tags: Optional[List[str]] = None

    rooms_map: ClassVar[Dict[str, str]] = dict(
        bedroom='房',
        livingroom='廳',
        bathroom='衛'
    )

    def to_dict(self):
        return asdict(self)
    
    @classmethod
    def from_591(
        cls,
        raw_item: Dict
    ):
        # Parse rooms
        rooms = dict()
        raw_rooms = raw_item.get('room_str')
        for en, ch in HouseItem.rooms_map.items():
            match = re.search(f'(\d+){ch}', raw_rooms)
            if match:
                rooms[en] = match.group(1)

        return cls(
            src='591',
            pid=raw_item.get('post_id'),
            url=f"https://rent.591.com.tw/home/{raw_item.get('post_id')}",
            title=raw_item.get('title'),
            price=int(raw_item.get('price').replace(',', '')),
            htype=raw_item.get('kind_name'),
            photo=raw_item.get('photo_list'),
            location=dict(
                city=None,  # TODO:
                section=raw_item.get('section_name'),
                street=raw_item.get('street_name'),
                complete=raw_item.get('location')
            ),
            rooms=rooms,
            tags=[tag.get('name') for tag in raw_item['rent_tag']] # + [f"{raw_item['surrounding']['desc']}{raw_item['surrounding']['distance']}"]
        )

    @classmethod
    def from_ddroom(
        cls,
        raw_item: Dict
    ):
        return cls(
            src='ddroom',
            pid=raw_item.get('object_id'),
            url=f"https://www.dd-room.com/object/{raw_item.get('object_id')}",
            title=raw_item.get('title'),
            price=int(raw_item.get('rent')),
            htype=raw_item.get('type_space_name'),
            photo=[cover['image']['md'] for cover in raw_item.get('covers')],
            location=dict(
                city=raw_item.get('address').get('city'),
                section=raw_item.get('address').get('area'),
                street=raw_item.get('address').get('road'),
                complete=raw_item.get('address').get('complete'),
            ),
            rooms=None,  # TODO:
            tags=raw_item.get('themes')
        )
    
    @classmethod
    def from_rakuya(
        cls,
        raw_item: Dict
    ):
        pass