import csv

new_data_dict = {}

with open("csv_ideal_ph.csv", 'r') as data_file:
    data = csv.DictReader(data_file, delimiter=";")
    for row in data:
        item = new_data_dict.get(row["Pflanze"], dict())
        item["Pflanze"] = row["Pflanze"]
        item["PH_MIN"] = row["PH_MIN"]
        item["PH_MAX"] = row["PH_MAX"]
        print(item)
