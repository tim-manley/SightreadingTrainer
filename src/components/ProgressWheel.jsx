import React from 'react'

function ProgressWheel(props) {

    const { progress, text } = props;

    const radius = 54.5;
    const stroke = 6;
    const normalizedRadius = radius - stroke * 2;
    const circumference = normalizedRadius * 2 * Math.PI;
    const strokeDashoffset = circumference - progress / 100 * circumference;

  return (
    <svg className='w-full h-full'>
      <circle
        stroke="#068BB8"
        fill="#93DDF9"
        strokeWidth={stroke}
        strokeDasharray={ circumference + ' ' + circumference }
        strokeDashoffset={ strokeDashoffset }
        style={ {transform: 'rotate(-90deg)', transformOrigin: '50% 50%'} }
        r={ normalizedRadius }
        cx="50%"
        cy="50%"
        />
        <text className={`font-adelle fill-lesson-bg/100 text-sm ${text === 'OVERALL' ? 'font-bold' : null}`} x="50%" y="50%" textAnchor="middle" dy=".3em">{text}</text>
    </svg>
  )
}

export default ProgressWheel