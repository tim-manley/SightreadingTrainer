import React from 'react'

function LessonCard(props) {
  return (
    <div className='w-full h-full flex flex-col space-y-4'>
        <div className={`h-12 flex flex-row items-center px-4 py-1 ${props.color} rounded-2xl`}>
            <a className='w-full flex flex-row justify-between items-center' href={props.link}>
                <div className='text-4xl font-primary font-normal text-white flex flex-row items-center'>{props.title}</div>
                {props.link ? <svg className='w-9 h-9 fill-white' id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80.5 80.45">
                                <path class="cls-1" d="M80.45,40.27A40.23,40.23,0,1,1,40.29,0,40.23,40.23,0,0,1,80.45,40.27Zm-14.07,0L38.22,16.09l-4,8.05L50.08,36.06l-.06.18H14.14v8h36.1l-16.05,12,4,8Z"/>
                            </svg> : null}
            </a>
        </div>
        <div className={`h-full flex flex-col items-start p-4 space-y-4 ${props.color} rounded-xl font-primary text-white`}>
            <h1 className='text-2xl font-semibold'>{props.header}</h1>
            <p className='text-xl font-normal'>
                {props.text}
            </p>
        </div>
    </div>
  )
}

export default LessonCard