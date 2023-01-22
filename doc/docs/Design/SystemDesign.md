import DraftArchitecture from '@site/src/img/draft-architecture.png';
import DraftArchitectureAnalysis from '@site/src/img/draft-analysis-architecture.png';

# System design

### Starting with

<img src={DraftArchitecture} />

The image above shows the initial ideas of the whole system while designing. It delivers three potential solutions, each of which has pros and cons. Check the analysis below.

---

### Analysis

**Which architecture/depoyment strategy is suit best on current sutiation ?**

_Options we have_:

- Microservers event driven (K8s)
- Microservers event driven (Serverless)
- Monolithic

_Factors that needed take into account_:

- Amount of users

  _The project was intended to be able scaling in the future, the only concern was: does it worth to spending extra hours to maintain the deloyment in the very beginning phase?_

- Budget

  _As the project itself are still in proof of concept level, so the cost should be as less as possible in this phase_

- Maintenance cost

  _Thinking about the maintenace cost: Managning,DevOps,Cloud Service and also for the future visioning_

- Study cost

  _The time and effort spend on each of these solution_

- Benefits form learning perspective

After all the the winner is: Microservers event driven (Serverless)

The image below shows the how do i evaluate it.

<img src={DraftArchitectureAnalysis} />
<a href="https://d-x.vercel.app/"><u> made by decision matrix</u></a>

### Conclusion and next

Since the decision was made => Microservers event driven (Serverless)  
The **next** thing is planning research:

1. [<u>How does Google Sub/Pub work ?</u>](/docs/Research/GoogleSubPub)
2. [<u>How to integrate Google Sub/Pub with serverless(Cloud run/Cloud function) Appliction ?</u>](/docs/Research/GoogleSubPub)
