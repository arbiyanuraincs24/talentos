function EvaluationResult({evaluation}) {

return (

<div className="evaluation-container">


<div className="score-circle">

<h1>
{evaluation.score}%
</h1>

<p>
Score
</p>

</div>



<div className="feedback-card">

<h2>
✅ Strengths
</h2>

<ul>

{
evaluation.strengths.map((item,index)=>(

<li key={index}>
{item}
</li>

))
}

</ul>

</div>




<div className="feedback-card">

<h2>
⚠ Weaknesses
</h2>

<ul>

{
evaluation.weaknesses.map((item,index)=>(

<li key={index}>
{item}
</li>

))
}

</ul>

</div>




<div className="feedback-card">

<h2>
🚀 Suggestions
</h2>

<ul>

{
evaluation.suggestions.map((item,index)=>(

<li key={index}>
{item}
</li>

))
}

</ul>

</div>


</div>

);

}


export default EvaluationResult;