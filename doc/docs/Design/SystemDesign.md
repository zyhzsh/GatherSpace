import DraftArchitecture from '@site/src/img/draft-architecture.png';
import DraftArchitectureAnalysis from '@site/src/img/draft-analysis-architecture.png';

# System design

### Starting with

<img src={DraftArchitecture} />

The image above displays the preliminary conceptualization of the system design. It presents three potential solutions, each with its own advantages and disadvantages. A thorough examination of the analysis is provided below.

---

### Analysis

**Which architecture/depoyment strategy is suit best on current sutiation ?**

_Options we have_:

- Microservers event driven (K8s)
- Microservers event driven (Serverless)
- Monolithic

_Factors that needed take into account_:

- Amount of users

  _The goal of the project is to ensure scalability in the future, however, the concern arises regarding the investment of additional time for maintenance and deployment during the initial phase, and whether it is deemed worthwhile._

- Budget

  _Since the project is still in its proof of concept phase, it is important to keep costs as low as possible during this stage._

- Maintenance cost

  _When considering maintenance costs, it is important to take into account factors such as management, DevOps, cloud service, and future planning._

- Study cost

  _The time and effort spend on each of these solution_

- Benefits form learning perspective

After considering all factors, the Microservices event driven (Serverless) approach emerged as the most suitable solution. The evaluation process is depicted in the image below.

<img src={DraftArchitectureAnalysis} />
<a href="https://d-x.vercel.app/"><u> made by decision matrix</u></a>

### Conclusion and next

Since the decision was made => Microservers event driven (Serverless)  
The **next** thing is planning research:

1. [<u>How does Google Sub/Pub work ?</u>](/docs/Research/GoogleSubPub)
2. [<u>How to integrate Google Sub/Pub with serverless(Cloud run/Cloud function) Appliction ?</u>](/docs/Research/GoogleSubPub)
