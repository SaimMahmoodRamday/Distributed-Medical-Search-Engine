
#!/usr/bin/env python3
import xml.etree.ElementTree as ET
import json
import calendar
from urllib.parse import quote
from pathlib import Path

def month_str_to_int(mon_str: str):
    """
    Try full month name or abbreviation → 1–12, else None.
    """
    if not mon_str:
        return None
    mon = mon_str.strip().capitalize()
    # full name
    if mon in calendar.month_name:
        return list(calendar.month_name).index(mon)
    # abbr
    if mon in calendar.month_abbr:
        return list(calendar.month_abbr).index(mon)
    return None

def parse_pubmed_xml_to_docs(xml_path: Path):
    tree = ET.parse(xml_path)
    root = tree.getroot()
    docs = []

    for article in root.findall(".//PubmedArticle"):
        pmid = article.findtext(".//PMID") or ""
        title = article.findtext(".//ArticleTitle") or ""
        abstract = article.findtext(".//Abstract/AbstractText") or ""
        authors = [
            au.findtext("LastName")
            for au in article.findall(".//Author")
            if au.findtext("LastName")
        ]
        keywords = [
            mh.findtext("DescriptorName")
            for mh in article.findall(".//MeshHeading")
            if mh.findtext("DescriptorName")
        ]

        # Journal info
        journal_title = article.findtext(".//Journal/Title") or ""

        # Raw pub date strings
        raw_year = article.findtext(".//JournalIssue/PubDate/Year") or ""
        raw_month = article.findtext(".//JournalIssue/PubDate/Month") or ""
        raw_day = article.findtext(".//JournalIssue/PubDate/Day") or ""

        # Convert to int
        pub_year = int(raw_year) if raw_year.isdigit() else None
        pub_month = month_str_to_int(raw_month)
        pub_day = int(raw_day) if raw_day.isdigit() else None

        # Build ISO date
        if pub_year:
            m = f"{pub_month:02d}" if pub_month else "01"
            d = f"{pub_day:02d}"   if pub_day   else "01"
            published_date = f"{pub_year}-{m}-{d}T00:00:00Z"
        else:
            published_date = None

        language = article.findtext(".//Language") or ""
        link = f"https://pubmed.ncbi.nlm.nih.gov/{pmid}" if pmid else ""

        # DOI
        doi_elem = (
            article.find(".//ELocationID[@EIdType='doi']")
            or article.find(".//PubmedData/ArticleIdList/ArticleId[@IdType='doi']")
        )
        doi = doi_elem.text if doi_elem is not None else None
        doi_url = f"https://doi.org/{quote(doi)}" if doi else None

        doc = {
            "id": pmid,
            "title": title,
            "abstract": abstract,
            "authors": authors,
            "keywords": keywords,
            "link": link,
            "journal_title": journal_title,
            "pub_year": pub_year,
            "pub_month": pub_month,
            "pub_day": pub_day,
            "published_date": published_date,
            "language": language,
            "doi": doi,
            "doi_url": doi_url
        }

        docs.append(doc)

    return docs

def main():
    # Get all .xml files in the current directory
    xml_files = Path(".").glob("*.xml")

    for xml_file in xml_files:
        docs = parse_pubmed_xml_to_docs(xml_file)

        output_file = xml_file.with_suffix(".json")  # change .xml → .json
        with open(output_file, "w", encoding="utf-8") as f:
            json.dump(docs, f, indent=2)

if __name__ == "__main__":
    main()

