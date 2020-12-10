SELECT
    m.date,
    m.prcp,
    m.tobs,
    s.station,
    s.name
FROM    
    measurement m
    join station s on m.station = s.station
WHERE
    date >= (
                SELECT
                date(MAX(date), '-365 day')
                FROM
                    measurement
            )
    ORDER BY
date
