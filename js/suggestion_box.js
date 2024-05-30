$(document).ready(function () {
    $('#search-box').on('input', function () {
        let query = $(this).val().trim();
        if (query.length > 0) {
            $.ajax({
                url: 'https://en.wikipedia.org/w/api.php?origin=*&action=opensearch&format=json&formatversion=2&search=query&namespace=0&limit=10&suggest=true',
                data: {
                    origin: '*',
                    action: 'opensearch',
                    format: 'json',
                    search: query,
                    suggest: true
                },
                dataType: 'json',
                success: function (data) {
                    let suggestions = data[1];
                    let links = data[3];
                    $('#suggestion-list').empty();
                    for (let i = 0; i < suggestions.length; i++) {
                        $('#suggestion-list').append(`<a href="${links[i]}" target="_blank" class="list-group-item list-group-item-action suggestion-item">${suggestions[i]}</a>`);
                    }
                    // Add the containing line at the end
                    $('#suggestion-list').append(`<div class="list-group-item list-group-item-action suggestion-item non-clickable"><span class="containing-text-here disable">containing... </span><div>${query}</div></div>`);
                    // Adjust height to display all suggestions
                    $('#suggestion-list').css('height', 'auto')
                }
            });
        } else {
            $('#suggestion-list').empty();
        }
    });

    $('#suggestion-list').on('click', '.suggestion-item', function (event) {
        event.preventDefault();
        window.open($(this).attr('href'), '_blank');
    });
});
