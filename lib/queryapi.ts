import openai from "./chatgpt";

const query = async (prompt: string, model: string) => {

  const res = await openai.chat.completions.create({
     model: model,
     messages: [{ role: 'user', content: prompt }],
     })
     .then
     (res => res.choices[0].message.content)
     .catch
     (err => `server error nooooo ${err.message}`)


return res


};

export default query;
