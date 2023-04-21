
const { platforms, languages, variants, tones, sizes } = require('../models/caption-models.js');



function generatePrompt({languageInputId, platformInputId, topicInput, variantInputId, toneInputId, webUrlInput, socialUrlInput, sizeInputId}) {

    const platformInput = platforms.find((r) => r.id ==  platformInputId).name;
    const languageInput = languages.find((r) => r.id ==  languageInputId).name;

    console.assert(variants.some((r) => r.id ==  variantInputId), "Variation doesn't exists");

    const toneDescription = tones.find((r) => r.id ==  toneInputId).description;
    const sizeDescription = sizes.find((r) => r.id ==  sizeInputId).description;

    let variationsExamples = '';
    for (let index = 0; index < variantInputId; index++) {

     variationsExamples +=
`Example format for the variation number ${index + 1}:

VARIATION ${index+1}\n
Write the variation text on this line.\n\n`;

    }


    let prompts =
    [
`Generate an engaging caption for a social media post. Include 3-6 relevant hashtags.  Below are more details about language, platform, how many variations you should deliver, the topic of the post, the style/tone of writing and the variation size.

Language: '${languageInput}'
Social Media Platform: '${platformInput}'
Variations: '${variantInputId}'
Post Topic: '${topicInput}'
Writing Style/Tone: '${toneDescription}'
Variation Size: '${sizeDescription}'
Instructions:

${variationsExamples}
`
];

    return prompts[0];
}

module.exports = {
    generatePrompt
}