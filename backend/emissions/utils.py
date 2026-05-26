def normalize_unit(value, unit):

    unit = unit.lower()

    if unit == 'litre':
        unit = 'liters'

    elif unit == 'l':
        unit = 'liters'

    elif unit == 'kilowatt-hour':
        unit = 'kWh'

    return value, unit



def calculate_emissions(value, category):

    factors = {

        'fuel': 2.5,

        'electricity': 0.5
    }

    factor = factors.get(category, 1)

    return round(value * factor, 2)



def calculate_travel_emissions(distance, mode):

    factors = {

        'flight': 0.25,

        'train': 0.05,

        'cab': 0.18
    }

    factor = factors.get(mode, 0.1)

    return round(distance * factor, 2)



def detect_suspicious(value):

    if value > 10000:
        return True

    return False