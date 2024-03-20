export const quillModules = {
    toolbar: [
        [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
        [{ 'size': [] }],
        [{
            'color': [
                '#ffffff', '#000000', '#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff', '#ffa500', '#a52a2a',
                '#800000', '#008000', '#000080', '#808000', '#800080', '#008080', '#808080', '#c0c0c0', '#ff0000', '#ff00ff',
                '#ff7f00', '#ffff00', '#00ff00', '#00ff7f', '#00ffff', '#007fff', '#0000ff', '#7f00ff', '#ff007f', '#ff7f7f',
                '#7fff00', '#7fffff', '#007f7f', '#7f7f7f', '#b0c4de', '#f0e68c', '#deb887', '#bdb76b', '#ff69b4', '#d8bfd8'
            ]
        }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
        ['link', 'image', 'video'],
        ['clean']
    ]
};
