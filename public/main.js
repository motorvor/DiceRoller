"use strict";

function dice_initialize(container) {
    $t.remove($t.id('loading_text'));

    var canvas = $t.id('canvas');
    canvas.style.width = window.innerWidth - 1 + 'px';
    canvas.style.height = window.innerHeight - 1 + 'px';
    var label = $t.id('label');
    var selector_div = $t.id('selector_div');
    var info_div = $t.id('info_div');

    $t.dice.use_true_random = false;

    var params = $t.get_url_params();

    if (params.chromakey) {
        $t.dice.desk_color = 0x00ff00;
        info_div.style.display = 'none';
        $t.id('control_panel').style.display = 'none';
    }
    if (params.shadows == 0) {
        $t.dice.use_shadows = false;
    }
    if (params.color == 'white') {
        $t.dice.dice_color = '#808080';
        $t.dice.label_color = '#202020';
    }

    var box = new $t.dice.dice_box(canvas, { w: 500, h: 300 });
    box.animate_selector = false;

    $t.bind(window, 'resize', function() {
        canvas.style.width = window.innerWidth - 1 + 'px';
        canvas.style.height = window.innerHeight - 1 + 'px';
        box.reinit(canvas, { w: 500, h: 300 });
    });

    function show_selector() {
        info_div.style.display = 'none';
        selector_div.style.display = 'inline-block';
        //box.draw_selector();
    }

    function before_roll(vectors, notation, callback) {
        info_div.style.display = 'none';
        selector_div.style.display = 'none';
        // do here rpc call or whatever to get your own result of throw.
        // then callback with array of your result, example:
        // callback([2, 2, 2, 2]); // for 4d6 where all dice values are 2.
        callback();
    }

    function notation_getter() {
        return { set: ['d20'], constant: 0, result: [], error: false };
    }

    function after_roll(notation, result) {
        if (params.chromakey) return;
        var res = result.join(' ');
        if (notation.constant) {
            if (notation.constant > 0) res += ' +' + notation.constant;
            else res += ' -' + Math.abs(notation.constant);
        }
        label.innerHTML = 'black: ' + result[0] + ', white: ' + result[1];
        info_div.style.display = 'inline-block';
    }

    box.bind_mouse(container, notation_getter, before_roll, after_roll);
    box.bind_throw($t.id('throw'), notation_getter, before_roll, after_roll);

    $t.bind(container, ['mouseup', 'touchend'], function(ev) {
        ev.stopPropagation();
        if (selector_div.style.display == 'none') {
            if (!box.rolling) show_selector();
            box.rolling = false;
            return;
        }
        var name = box.search_dice_by_mouse(ev);
        if (name != undefined) {
            var notation = { set: ['d20'], constant: 0, result: [], error: false };
            notation.set.push(name);
        }
    });

    if (params.notation) {
        set.value = params.notation;
    }
    if (params.roll) {
        $t.raise_event($t.id('throw'), 'mouseup');
    }
    else {
        show_selector();
    }
}
