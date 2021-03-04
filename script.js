const textarea = document.querySelector('#json');
const error = document.querySelector('#error');
const responses = document.querySelector('#responses');

error.innerHTML = '';

const submit = () => {
    const { value } = textarea;
    error.innerHTML = '';
    responses.innerHTML = '';
   
        const data = JSON.parse(value);
        console.log(data);

        const questions = data.testPart[0].assessmentSection[1].questions;

        if(!questions) {
            error.innerHTML = 'JSON Inválido 2';
            return;
        }

        console.log(questions);
        
        questions.forEach((question, index) => {
            const correctAnswerCode = question.responseDeclaration[0].correctResponse.value[0];

            let correctResponse = 'awdaw';
            question.itemBody.choiceInteraction[0].simpleChoice.forEach((choice) => {
                console.log(correctAnswerCode);
                if(choice._identifier === correctAnswerCode) {
                    correctResponse = choice.__text.replace(/<[^>]*>?/gm, '')
                }
            })

            responses.innerHTML += ` <div class="item">
            <p class="text-3xl font-bold">${index + 1}.</p>
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div class="shadow-mdmin-h-32  mt-5 rounded-md p-5 border border-gray-400">
                    <p class="text-3xl font-bold">Pergunta</p>
                    <p class="mt-2">${question._title}</p>
                </div>
                <div class="shadow-md min-h-32 mt-5 rounded-md p-5 border border-gray-400">
                    <p class="text-3xl font-bold">Resposta</p>
                    <p class="mt-2">${correctResponse}</p>
                </div>
            </div>
          </div>`
        })
        

}
    

