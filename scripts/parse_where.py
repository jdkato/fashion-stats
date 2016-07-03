import csv
import os

AREA_INDEX = 8
COUNT_INDEX = 13
DATA_PATH = os.path.join(os.path.dirname(
    os.path.realpath(__file__)), "data", "where"
)


def get_counts_by_state():
    """
    """
    counts_by_state = {}
    for f in os.listdir(DATA_PATH):
        if not f.endswith(".csv"):
            continue
        year = f.split(".")[0]
        with open(os.path.join(DATA_PATH, f), "rU") as csv_file:
            reader = csv.reader(csv_file)
            headers = next(reader)
            for row in reader:
                area = row[AREA_INDEX]
                if "--" not in area or row[AREA_INDEX + 1] != "Private":
                    continue
                state = area.split("--")[0].strip()
                count = row[COUNT_INDEX]
                if state not in counts_by_state:
                    counts_by_state[state] = []
                counts_by_state[state].append((year, count))
    return counts_by_state


def print_state_trend():
    """
    """
    d = get_counts_by_state()
    data = "var state2Trend = {\n"
    for state, tup in sorted(d.items()):
        values = [int(v[1]) for v in tup]
        data += "    '{0}': {1},\n".format(state, values)
    data += "};"
    print(data)
