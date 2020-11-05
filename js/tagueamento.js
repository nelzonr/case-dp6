// Preencha este arquivo com qualquer código que você necessite para realizar a
// coleta, desde a biblioteca analytics.js, gtag.js ou o snippet do Google Tag
// Manager. No último caso, não é necessário implementar a tag <noscript>.
// O ambiente dispõe da jQuery 3.5.1, então caso deseje, poderá utilizá-la
// para fazer a sua coleta.
// Caso tenha alguma dúvida sobre o case, não hesite em entrar em contato.

const DEBUG = false;

if (DEBUG) {
    // Função utilizada apenas para debug
    var ga = function(){
        console.warn(arguments);
    };
} else {
    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

    // 1º - Código de avaliação configurado
    ga('create', 'UA-12345-6', 'auto');

    // 2º - Visualização de Página sendo enviada para todas as páginas
    ga('send', 'pageview');
}


(function($){

    // 3º - Eventos nos links "Entre em Contato" e "Download PDF"
    var eventos = new Map([
        ['menu-lista-contato', ['menu', 'entre_em_contato', 'link_externo']],
        ['menu-lista-download', ['menu', 'download_pdf', 'download_pdf']]
    ]);
    eventos.forEach((options, selector) => {
        const [categoria, acao, rotulo] = options;
        $(`a.${selector}`).click(function(){
            ga('send', 'event', categoria, acao, rotulo);
        });
    });

    // 4º - Eventos nos botões da página 'analise.html'
    $('.card.card-montadoras').click(function(){
        ga('send', 'event', 'analise', 'ver_mais', this.dataset.name);
    });

    // 5º - Eventos nos campos 'nome', 'email', 'telefone' e 'aceito' do formulário "Contato" na página 'sobre.html'
    $('form.contato input').each(function(i, input){
        $(input).change(event => ga('send', 'event', 'contato', input.id, 'preencheu'))
    });

    // 6º - Evento enviado SOMENTE APÓS a exibição do popup no formulário de "Contato" na página 'sobre.html'
    $('body').bind('DOMSubtreeModified', function() {
        if ($(this).hasClass('lightbox-open')) {
            ga('send', 'event', 'contato', 'enviado', 'enviado');
        }
    });

})(jQuery);
