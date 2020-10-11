{\rtf1\ansi\ansicpg1252\cocoartf2513
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\margl1440\margr1440\vieww10800\viewh8400\viewkind0
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural\partightenfactor0

\f0\fs24 \cf0 Option Explicit\
\
Sub stocks()\
\
    'declarations\
    Dim ws As Worksheet\
    Dim stockName As String\
    Dim stockTotal As Double\
    Dim i As Double\
    Dim lastRow As Double\
    Dim summaryTableRow As Integer\
    Dim stockOpenPrice As Double\
    Dim stockClosePrice As Double\
    Dim yearlyChange As Double\
    Dim percentChange As Double\
      \
    'Second Summary Table Vars\
    Dim greatestIncreaseStock As String\
    Dim greatestDecreaseStock As String\
    Dim mostVolumeStock As String\
    Dim greatestIncrease As Double\
    Dim greatestDecrease As Double\
    Dim mostVolume As Double\
    \
    ' --------------------------------------------\
    ' LOOP THROUGH ALL SHEETS\
    ' --------------------------------------------\
    For Each ws In Worksheets\
    \
        'Column Headers\
        ws.Cells(1, 9).Value = "Ticker"\
        ws.Cells(1, 10).Value = "Yearly Change"\
        ws.Cells(1, 11).Value = "Percent Change"\
        ws.Cells(1, 12).Value = "Total Stock Volume"\
        ws.Cells(1, 15).Value = "Ticker"\
        ws.Cells(1, 16).Value = "Value"\
        \
        'Row Headers\
        ws.Cells(2, 14).Value = "Greatest % Increase"\
        ws.Cells(3, 14).Value = "Greatest % Decrease"\
        ws.Cells(4, 14).Value = "Greatest Total Volume"\
        \
        'initial total\
        stockTotal = 0\
        lastRow = ws.Cells(Rows.Count, 1).End(xlUp).Row\
        summaryTableRow = 2\
        greatestIncrease = 0\
        greatestDecrease = 0\
        mostVolume = 0\
        \
        'Stock Open Price\
        stockOpenPrice = ws.Cells(2, 3).Value\
        \
        ' Loop through all stock purchases\
        For i = 2 To lastRow\
        \
            ' Add to the Stock Total\
            stockTotal = stockTotal + ws.Cells(i, 7).Value\
            \
            ' Check if we are still within the same stock ticker, if it is not...\
            If ws.Cells(i + 1, 1).Value <> ws.Cells(i, 1).Value Then\
            \
                'Grab the Stock Closing Price\
                stockClosePrice = ws.Cells(i, 6).Value\
                \
                ' Yearly Change\
                yearlyChange = stockClosePrice - stockOpenPrice\
                \
                ' Percent Change\
                'deal with divide by 0\
                If stockOpenPrice = 0 Then\
                    percentChange = 100 * (yearlyChange / 1E-07)\
                Else:\
                    percentChange = 100 * (yearlyChange / stockOpenPrice)\
                End If\
                \
                ' Set the Stock name\
                stockName = ws.Cells(i, 1).Value\
                \
                ' Print to Summary Table\
                ws.Range("I" & summaryTableRow).Value = stockName\
                ws.Range("J" & summaryTableRow).Value = yearlyChange\
                \
                'Conditional Color\
                If yearlyChange > 0 Then\
                    ws.Range("J" & summaryTableRow).Interior.ColorIndex = 4\
                ElseIf yearlyChange < 0 Then\
                    ws.Range("J" & summaryTableRow).Interior.ColorIndex = 3\
                Else\
                    ws.Range("J" & summaryTableRow).Interior.ColorIndex = 2\
                End If\
                \
                'Write to Summary Table\
                ws.Range("K" & summaryTableRow).Value = percentChange\
                ws.Range("L" & summaryTableRow).Value = stockTotal\
                \
                ' Add one to the summary table row\
                summaryTableRow = summaryTableRow + 1\
                \
                ' Reset the Stock Total\
                stockTotal = 0\
                \
                'Reset Yearly Change\
                stockOpenPrice = ws.Cells(i + 1, 3)\
            \
            End If\
        \
        Next i\
        \
        'Loop through to Summary Table 2.0\
        For i = 2 To summaryTableRow\
            'three conditionals\
            If ws.Cells(i, 11).Value > greatestIncrease Then\
                greatestIncrease = ws.Cells(i, 11).Value\
                greatestIncreaseStock = ws.Cells(i, 9)\
            End If\
            If ws.Cells(i, 11).Value < greatestDecrease Then\
                greatestDecrease = ws.Cells(i, 11).Value\
                greatestDecreaseStock = ws.Cells(i, 9)\
            End If\
            If ws.Cells(i, 12).Value > mostVolume Then\
                mostVolume = ws.Cells(i, 12).Value\
                mostVolumeStock = ws.Cells(i, 9)\
            End If\
        Next i\
        \
        'write to Second Summary Table\
        ws.Range("O2").Value = greatestIncreaseStock\
        ws.Range("P2").Value = greatestIncrease\
        ws.Range("O3").Value = greatestDecreaseStock\
        ws.Range("P3").Value = greatestDecrease\
        ws.Range("O4").Value = mostVolumeStock\
        ws.Range("P4").Value = mostVolume\
    \
    Next ws\
\
End Sub\
}