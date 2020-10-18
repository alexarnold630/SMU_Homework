import os
import csv
import numpy as np

csvpath = r"Resources/budget_data.csv"

totalMonths = 0
totalProfit = 0

isFirstRow=True
lastRowProfit= 0
changeDict = {}

with open(csvpath) as csvfile:
    csvreader = csv.reader(csvfile, delimiter=",")

    #skip header row
    csv_header = next(csvreader)
    print(f"CSV Header: {csv_header}")

    for row in csvreader:

        #row[0]=month-year
        #row[1]=profit/loss

        totalMonths += 1
        totalProfit += int(row[1])

        # loop- if first row, do nothing but set lastRowProfit
        # otherwise, get change and update lastRowProfit
        if isFirstRow:
            lastRowProfit = int(row[1])
            isFirstRow = False
        else:
            change = int(row[1]) - lastRowProfit
            changeDict[row[0]] = change
            lastRowProfit = int(row[1])
 
averageChange = (np.mean(list(changeDict.values())))

#https://www.geeksforgeeks.org/python-get-key-with-maximum-value-in-dictionary/
minChangeMonth = min(changeDict, key=changeDict.get) #taken from internet
minChangeValue = changeDict[minChangeMonth]
maxChangeMonth = max(changeDict, key=changeDict.get) #taken from internet
maxChangeValue = changeDict[maxChangeMonth]
    
summaryString = f"""Financial Analysis
-------------------------
Total Month: {totalMonths}
Total: ${totalProfit} 
# Average Change: ${round(averageChange, 2)}
Greatest Increase In Profits: {maxChangeMonth}(${maxChangeValue})
Greatest Decrease In Profits: {minChangeMonth}(${minChangeValue})
"""

#write to file
with open("bank_results.txt", "w") as file2:
    file2.write(summaryString)