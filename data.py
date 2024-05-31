import requests

def get_api_data(url, params):
    response = requests.get(url, params=params)
    response.raise_for_status()  #잘못된 응답에 대해 오류   를 제기하는지 확인
    data_dict = response.json()
    print(data_dict)  # api response 디버깅해보기 print
    return data_dict

def fetch_all_data():
    url = 'http://apis.data.go.kr/1360000/AsosDalyInfoService/getWthrDataList'
    params = {
        'serviceKey': '5mHP3AIBIBjKTzNoLMxDZtyiU308Vbj6xbRjFBb+S51zfBxMxIFTcFvNJ26FAESp28/gwFAdE9wZhgnQ9jznhA==',
        'pageNo': '1',
        'numOfRows': '365',
        'dataType': 'json',
        'dataCd': 'ASOS',
        'dateCd': 'DAY',
        'startDt': '20230101',
        'endDt': '20231231',
        'stnIds': '90'
    }
    return get_api_data(url, params)