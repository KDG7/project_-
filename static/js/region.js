document.addEventListener('DOMContentLoaded', function() {
    // .other_region_box에 클릭 이벤트를 추가합니다.
    document.querySelector('.other_region_box').addEventListener('click', function(event) {
        // 클릭된 요소가 .other_region 클래스를 가지고 있는지 확인합니다.
        if (event.target.classList.contains('other_region')) {
            // 모든 .other_region 요소의 배경색을 초기화합니다.
            document.querySelectorAll('.other_region').forEach(function(item) {
                item.style.backgroundColor = '';
            });

            // 클릭된 요소의 배경색을 변경합니다.
            event.target.style.backgroundColor = '#e4e4e5';
        }
    });

    // .region_child_child_list에 클릭 이벤트를 추가합니다.
    document.querySelectorAll('.region_child_child_box').forEach(function(box) {
        box.addEventListener('click', function(event) {
            // 클릭된 요소가 .region_child_child 클래스를 가지고 있는지 확인합니다.
            if (event.target.classList.contains('region_child_child')) {
                // 모든 .region_child_child 요소의 배경색을 초기화합니다.
                box.querySelectorAll('.region_child_child').forEach(function(item) {
                    item.style.backgroundColor = '';
                });

                // 클릭된 요소의 배경색을 변경합니다.
                event.target.style.backgroundColor = '#e4e4e5';

                document.querySelector('.title_r_r').textContent = event.target.textContent;   
            }
        });
    });
});


function showRegion(content) {
    // 모든 지역 목록 숨기기
    var regions = document.querySelectorAll(".region_child_box");
    regions.forEach(function(region) {
        region.style.display = 'none';
    });
    var childRegions = document.querySelectorAll(".region_child_child_box");
    childRegions.forEach(function(childRegion) {
        childRegion.style.display = 'none';
    });
    
    // 선택한 지역의 하위 지역 목록 표시
    var selectedRegion = document.getElementById("region_" + content);
    if (selectedRegion) {
        selectedRegion.style.display = 'block';
    }
}

function showChildRegion(content) {
    // 모든 하위 지역 목록 숨기기
    var regions = document.querySelectorAll(".region_child_box");
    regions.forEach(function(region) {
        region.style.display = 'none';
    });
    var childRegions = document.querySelectorAll(".region_child_child_box");
    childRegions.forEach(function(childRegion) {
        childRegion.style.display = 'none';
    });

    // 선택한 하위 지역의 세부 목록 표시
    var selectedChildRegion = document.getElementById("region_" + content);
    if (selectedChildRegion) {
        selectedChildRegion.style.display = 'block';
    }
}