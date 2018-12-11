require(['./js/config.js'], function() {
    require(['bscroll', 'jquery'], function(bscroll, $) {
        var scroll = new bscroll('.scroll', {
            probeType: 2,
            click: true,
            scrollbar: true,
        });
        //上拉加载
        var inner = document.querySelector('.inner');
        scroll.on('scroll', function() {
            if (this.y < this.maxScrollY - 44) {
                if (page < total) {
                    inner.setAttribute('up', '释放加载更多...')
                } else {
                    inner.setAttribute('up', '没有更多数据')
                }
            } else if (this.y < this.maxScrollY - 22) {
                if (page < total) {
                    inner.setAttribute('up', '上拉加载')
                } else {
                    inner.setAttribute('up', '没有更多数据')
                }
            }
        })
        scroll.on('touchEnd', function() {
            if (inner.getAttribute('up') === '释放加载更多...') {
                if (page < total) {
                    page++;
                    getProduct();
                    inner.setAttribute('up', '上拉加载')
                } else {
                    inner.setAttribute('up', '没有更多数据')
                }
            }
        })
        var type = 1,
            page = 1,
            pageSize = 6;
        getProduct();

        function getProduct() {
            $.ajax({
                url: 'api/get/list',
                data: {
                    type: type,
                    page: page,
                    pageSize: pageSize
                },
                success: function(res) {
                    if (res.code === 1) {
                        renderList(res.data);
                        scroll.refresh();
                        total = res.total;
                    }
                }
            })
        }


        var baseUrl = 'http://localhost:3000/images/'

        function renderList(data) {
            var str = '';
            data.forEach(function(item) {
                str += ` <dl>
                        <dt>
                        <img src="${baseUrl}${item.url}" alt="">
                    </dt>
                        <dd>
                           ${item.title}
                        </dd>
                    </dl>`
            })
            document.querySelector('.inner').innerHTML += str;
        }
        var ulList = document.querySelector('.ulList');
        ulList.addEventListener('click', function(e) {
            type = e.target.getAttribute('data-id');
            page = 1;
            document.querySelector('.inner').innerHTML = '';
            getProduct();
        })
    })
})