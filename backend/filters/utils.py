import re


def concate_values(values):
    if isinstance(values, list):
        return ','.join(values)
    return values


def parse_price(price_str):
    '''
    Parse price string to corresponding min and max value.

    Example
    ----------
    ```
    parse_price('10000-20000')
    >>> ['10000', '20000']
    parse_price('5000以下')
    >>> [None, '5000']
    parse_price('40000以上')
    >>> ['40000', None]
    ```

    Returns
    ----------
    * price_min
    * price_max
    '''
    if '-' in price_str:
        return price_str.split('-')
    if '以下' in price_str:
        return None, re.match(r'(\d*)以下', price_str).group(1)
    if '以上' in price_str:
        return re.match(r'(\d*)以上', price_str).group(1), None

    return None, None
