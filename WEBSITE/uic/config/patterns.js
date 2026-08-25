/**
 * THE UNIVERSE IS CALLING — secondary pattern library (Dimension 2: what she needs to hear).
 *
 * These are NOT diagnoses. Keep the framing soft: "your answers suggest," never
 * "you have." interpret(ctx) returns natural prose built from a couple of
 * insertion points, not a mad-lib — read a few results out loud after editing
 * to make sure they still sound human. ctx = { firstName, manifestingNoun, resultTitle }
 *
 * Add a new pattern: add an object here with a unique key. The scoring engine
 * in engine.js already knows how to route to any pattern key that appears in
 * questions.js option weights — no other code changes needed.
 */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.UIC = root.UIC || {};
    Object.assign(root.UIC, factory());
  }
})(typeof self !== 'undefined' ? self : globalThis, function () {
  'use strict';

  var PATTERNS = [
    {
      key: 'chasing',
      label: 'Chasing',
      interpret: function (ctx) {
        return "Your answers keep pointing toward CHASING.\n\nYou go after what you want — hard. The problem isn't the desire, it's the grip. " +
          "Chasing " + ctx.manifestingNoun + " keeps it just out of reach, because you're always running toward it instead of letting it arrive.\n\n" +
          "The shift isn't wanting it less. It's stepping back far enough for it to catch up to you.";
      }
    },
    {
      key: 'checking',
      label: 'Checking',
      interpret: function (ctx) {
        return "Your answers keep pointing toward CHECKING.\n\nYou know what you want. But when reality gets quiet, you start looking for proof. " +
          "The number. The message. The evidence. Every check quietly asks the same question: \"Is it here yet?\"\n\n" +
          "The shift isn't pretending you don't care. It's no longer requiring today's evidence to authorize tomorrow's reality.";
      }
    },
    {
      key: 'doubting',
      label: 'Doubting',
      interpret: function (ctx) {
        return "Your answers keep pointing toward DOUBTING.\n\nWhen things go quiet, you read the silence as a no. So you start building the case against " + ctx.manifestingNoun + " before it's even had time to show up.\n\n" +
          "Quiet isn't rejection. It's just quiet. The shift is letting the pause be neutral instead of evidence.";
      }
    },
    {
      key: 'switching',
      label: 'Switching',
      interpret: function (ctx) {
        return "Your answers keep pointing toward SWITCHING.\n\nYou change the technique, the offer, the approach — right before any of them get the chance to compound. It feels like progress. It's actually a reset button.\n\n" +
          "The shift isn't finding the \"right\" method. It's staying with one long enough to find out it was already working.";
      }
    },
    {
      key: 'settling',
      label: 'Settling',
      interpret: function (ctx) {
        return "Your answers keep pointing toward SETTLING.\n\nYou want something bigger. But somewhere along the way you started negotiating the number down to whatever felt \"realistic\" — and calling that peace.\n\n" +
          "The shift is letting the desire stay its full size, even before it's proven possible.";
      }
    },
    {
      key: 'holding',
      label: 'Holding',
      interpret: function (ctx) {
        return "Your answers keep pointing toward HOLDING.\n\nYou're good at receiving a win. You're less practiced at letting it become normal. " + ctx.manifestingNoun.charAt(0).toUpperCase() + ctx.manifestingNoun.slice(1) + " shows up, and some part of you starts bracing for it to leave again.\n\n" +
          "The shift isn't the receiving. It's letting the new level stay boring.";
      }
    },
    {
      key: 'visibility',
      label: 'Visibility',
      interpret: function (ctx) {
        return "Your answers keep pointing toward VISIBILITY.\n\nYou want to be seen — chosen, noticed, sold out. But some part of you also flinches at what being seen might cost: criticism, pressure, no more hiding.\n\n" +
          "The shift isn't getting louder. It's letting yourself be seen without immediately bracing for the fallout.";
      }
    },
    {
      key: 'waiting',
      label: 'Waiting',
      interpret: function (ctx) {
        return "Your answers keep pointing toward WAITING.\n\nSomewhere along the way, \"waiting for it\" quietly became part of your identity. It's familiar. It's also the thing standing between you and " + ctx.manifestingNoun + ".\n\n" +
          "The shift is deciding you're someone this is already happening for — not someone still in line for it.";
      }
    },
    {
      key: 'forcing',
      label: 'Forcing',
      interpret: function (ctx) {
        return "Your answers keep pointing toward FORCING.\n\nYou assume the result needs your grip on it — more effort, more control, more pushing. So you push. And pushing makes it feel further away, not closer.\n\n" +
          "The shift isn't doing nothing. It's doing less while expecting more.";
      }
    },
    {
      key: 'receiving',
      label: 'Receiving',
      interpret: function (ctx) {
        return "Your answers keep pointing toward RECEIVING.\n\nYou're comfortable wanting. You're less practiced at letting things arrive without over-earning them first — the help, the money, the love, the yes.\n\n" +
          "The shift isn't working harder to deserve it. It's letting it land before you've justified it."
          ;
      }
    }
  ];

  return { PATTERNS: PATTERNS };
});
