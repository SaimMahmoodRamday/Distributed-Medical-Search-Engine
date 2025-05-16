# 🧠 Distributed Medical Search Engine

This project is an AI-powered distributed search engine designed to help clinicians and researchers efficiently explore large-scale medical literature. It retrieves and summarizes/explains articles on generic level for non-professionals using LLM , streamlining the information overload problem in healthcare research. As it follows distributed architecture it is very time efficient.

---

## 📌 Features

- 🔍 Fast and intelligent medical search engine with various custom filters
- 🧠 Real-time abstractive summarization/generic explanation using Gemini LLM
- 🗃️ Distributed architecture with separate frontend and backend
- ⚙️ Fault tolerance, replication, and sharding using Solr
- 📉 Incorrect Query Handling , Retrieves the most relevant results

---

## 🏗️ Distributed System Design

This project is built as a **distributed system** to ensure scalability, high availability, and fault tolerance:

- 🔄 **Sharding**: Medical records are split across multiple Solr shards, enabling parallel indexing and distributed query processing.
- 📦 **Replication**: Each shard is replicated on multiple nodes to ensure redundancy and continued availability during node failures.
- ⚖️ **Leader Election & Failover**: Apache ZooKeeper monitors node health and handles automatic failover and leader election.
- 🐳 **Containerized Infrastructure**: All Solr nodes and ZooKeeper instances are deployed in Docker containers for portability and consistent environments.
- 📊 **Performance Testing**: Apache JMeter simulates concurrent search and indexing workloads to evaluate system throughput and response time.


---

## 🚀 Project Setup Instructions

### 🔧 Prerequisites

- Node.js (v18+)
- Python 3
- Docker & Docker Compose
- Google Gemini API Key

---

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/medical-search-engine.git
cd medical-search-engine
```

---

### 2. Frontend Setup

```bash
cd front
npm install
```

---

### 3. Backend Setup

```bash
cd ../back
npm install
npm install @google/generative-ai
```

> Create an `.env` file in the `back` folder:

```
GEMINI_API=your_api_key_here
```

---

### 4. Prepare the Medical Data

- Download your medical corpus XML files and place them in a folder named `raw_data/` in the project root.
- Convert them to JSON using the provided script:

```bash
python XML_to_JSON.py
```

> The JSON files will be saved into the `data/` directory.

---

### 5. Start Solr Cluster using Docker

```bash
docker-compose up -d
```

> This launches multiple Solr nodes and a ZooKeeper ensemble for orchestration.

---

### 6. Create Solr Collection with Shards and Replicas

```bash
docker exec -it medicalsearchengine-solr1-1 solr create_collection -c pubmed -d _default -shards 2 -replicationFactor 2 -p 8983
```

---

### 7. Index JSON Data into Solr

**Windows Command Prompt:**

```cmd
for %f in (data\*.json) do curl http://localhost:8983/solr/pubmed/update?commit=true -H "Content-Type: application/json" --data-binary @%f
```

**Linux/macOS Bash:**

```bash
for f in data/*.json; do
  curl http://localhost:8983/solr/pubmed/update?commit=true -H "Content-Type: application/json" --data-binary @"$f"
done
```

---

## 🧪 Run the Project

Note: Solr should be running in the background in Docker.

### ✅ Start Frontend

```bash
cd front
npm start
```

### ✅ Start Backend

```bash
cd ../back
node index.js
```

---

## 📈 Performance Metrics

| Metric                 | Value               |
|------------------------|---------------------|
| Total Requests Sent    | 1000                |
| ✅ Successful Requests |  770                |
| ❌ Failed Requests     | 230                 |
| 🕒 Avg. Response Time  | 13 ms               |
| ⚡ Throughput           | 10.0 requests/sec   |

---

## 🖼️ UI Screenshots

### 🔍 Interface

![Interface](./assets/searchenginegit.jpg)

---

## 💡 Future Improvements

- Integrate relevance ranking
- Automation for data corpus
- Pure Semantic Search intergration using AI Models

---

## 📜 License

This project is licensed under the [MIT License](LICENSE).
