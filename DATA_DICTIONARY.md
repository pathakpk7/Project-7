# DATA DICTIONARY — CAPTAIN COOL: DECODED

| Term / Field | Data Type | Definition & Cricket Standard |
| :--- | :--- | :--- |
| `matches` | Integer | Total official matches played in the specified format/population. |
| `innings` | Integer | Total innings in which MS Dhoni batted. |
| `runs` | Integer | Total runs scored off the bat. |
| `balls` | Integer | Total legal deliveries faced. |
| `not_outs` | Integer | Innings concluded without being dismissed. |
| `highest_score` | String | Highest individual score in an innings (marked with `*` if unbeaten). |
| `average` | Float / String | $\frac{\text{Runs}}{\text{Innings} - \text{Not Outs}} = \frac{\text{Runs}}{\text{Dismissals}}$. If zero dismissals, undefined/infinite. |
| `strike_rate` | Float / String | $\frac{\text{Runs}}{\text{Balls Faced}} \times 100$. |
| `hundreds` (`100s`) | Integer | Innings with $\ge 100$ runs. |
| `fifties` (`50s`) | Integer | Innings with $50 \le \text{Runs} \le 99$. |
| `fours` (`4s`) | Integer | Total 4-run boundaries struck. |
| `sixes` (`6s`) | Integer | Total 6-run over-the-rope hits struck. |
| `catches` | Integer | Catches taken as a designated wicketkeeper. |
| `stumpings` | Integer | Stumpings completed behind the wicket. |
| `dismissals` | Integer | $\text{Catches} + \text{Stumpings}$. |
| `win_percentage` | Float | $\frac{\text{Wins} + 0.5 \times \text{Ties}}{\text{Total Matches}} \times 100$ (or official ICC standard). |
| `reaction_time` | String | Telemetry broadcast measurement in seconds (e.g., `0.08s` stumping Keemo Paul). |
