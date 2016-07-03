import csv
import os

code_2_item = {
    360110: "Men's suits",
    360120: "Men's sportcoats and tailored jackets",
    360210: "Men's coats, jackets, and furs",
    360311: "Men's underwear",
    360312: "Men's hosiery",
    360320: "Men's sleepwear/loungewear",
    360330: "Men's accessories",
    360340: "Men's sweaters and vests",
    360350: "Men's active sportswear",
    360410: "Men's shirts",
    360513: "Men's pants and shorts",
    360901: "Men's uniforms",
    370110: "Boys' coats, jackets, and furs",
    370120: "Boys' sweaters",
    370130: "Boys' shirts",
    370211: "Boys' underwear",
    370212: "Boys' sleepwear/loungewear",
    370213: "Boys' hosiery",
    370220: "Boys' accessories",
    370311: "Boys' suits, sportcoats, and vests",
    370314: "Boys' pants and shorts",
    370901: "Boys' uniforms and active sportswear",
    380110: "Women's coats, jackets and furs",
    380210: "Women's dresses",
    380311: "Women's sportcoats and tailored jackets",
    380312: "Women's vests, sweaters, and sweater sets",
    380313: "Women's shirts, tops, and blouses",
    380320: "Women's skirts and culottes",
    380333: "Women's pants and shorts",
    380340: "Women's active sportswear",
    380410: "Women's sleepwear/loungewear",
    380420: "Women's undergarments",
    380430: "Women's hosiery",
    380510: "Women's suits",
    380901: "Women's accessories",
    380902: "Women's uniforms",
    390110: "Girls' coats, jackets, and furs",
    390120: "Girls' dresses and suits",
    390210: "Girls' sport coats, tailored jackets, shirts, blouses, sweaters, sweater sets, and vests",
    390223: "Girls' pants and shorts",
    390230: "Girls' active sportswear",
    390310: "Girls' undergarments and sleepwear/loungewear",
    390321: "Girls' hosiery",
    390322: "Girls' accessories",
    390901: "Girls' uniforms",
    400110: "Men's footwear",
    400210: "Boys' footwear",
    400220: "Girls' footwear",
    400310: "Women's footwear",
    410110: "Infants' coats, jackets, and snowsuits",
    410120: "Infants' rompers, dresses, and sweaters",
    410130: "Infants' undergarments, including diapers",
    410140: "Infants' sleeping garments",
    410901: "Infants' accessories, hosiery, and footwear"
}

UUC_INDEX = 10
COST_INDEX = 11
DATA_PATH = os.path.join(os.path.dirname(
    os.path.realpath(__file__)), "data", "what", "2010"
)


def get_items():
    """
    """
    costs_by_item = {}
    for f in os.listdir(DATA_PATH):
        if not f.endswith(".csv"):
            continue
        with open(os.path.join(DATA_PATH, f), "rU") as csv_file:
            reader = csv.reader(csv_file)
            headers = next(reader)
            for i, row in enumerate(reader):
                if i == 0:
                    print(row)
                item = code_2_item.get(int(row[UUC_INDEX]))
                if item is None:
                    continue
                cost = int(row[COST_INDEX])
                if item in costs_by_item:
                    costs_by_item[item] += cost
                else:
                    costs_by_item[item] = cost
    return costs_by_item

print(get_items())
