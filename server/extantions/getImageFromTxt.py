from serpapi import GoogleSearch

params = {
    "q": "merge sort",
    "tbm": "isch",
    "tbs": "algorithm",
    "engine": "google",
    "google_domain": "google.com",
    "lr": "lang_iw|lang_en",
    "num": "10",
    "api_key": "f09834b970abc1d46e74ddcf046cb41dde0a4feef039268388ae5cd24a3d9746"
}

search = GoogleSearch(params)
results = search.get_dict()
images_results = results['images_results']