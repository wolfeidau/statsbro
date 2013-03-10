# statsbro

Util module which logs a subset of system information and statistics.

## Examples

To simply print a system overview then log system statistics.

```javascript

var StatsBro = require('statsbro'),
    statsbro = new StatsBro();

// immediately prints some basic system info and
// adds statistics log timer which will output every 10000ms
statsbro.systemInfo();

// setup the stats log timer
var logStatsContext = logStats(10000)

// start the timer
logStatsContext();

```
