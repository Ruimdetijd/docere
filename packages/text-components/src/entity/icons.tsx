import React from 'react'
import { EntityType, Entity } from '@docere/common'

export type IconProps = { active: boolean, entity: Entity }

// Person
function PersonSvg(props: IconProps) {
	return (
		<svg
			className="icon"
			viewBox="0 0 64 54"
		>
			<path
				fill={props.active ? 'white' : props.entity.color}
				d="M31.941,36.688c-7.102,0-12.856-6.898-12.856-15.401c0-8.502,5.754-14.804,12.856-14.804c7.103,0,12.862,6.302,12.862,14.804C44.803,29.79,39.044,36.688,31.941,36.688z M11.943,57.508c0,0-2.727,0.18-3.928-1.475c-0.649-0.894-0.197-2.706,0.247-3.717l1.087-2.477c0,0,3.006-6.723,6.428-10.619c2.102-2.389,4.602-1.845,6.219-1.068c0.996,0.478,2.122,1.871,2.945,2.609c1.134,1.017,3.136,2.173,6.409,2.238h2.008c3.271-0.065,5.273-1.221,6.406-2.238c0.822-0.738,1.917-2.174,2.904-2.668c1.484-0.743,3.743-1.2,5.79,1.127c3.423,3.896,6.134,10.741,6.134,10.741l1.114,2.429c0.461,1.004,0.933,2.807,0.302,3.713c-1.126,1.62-3.654,1.405-3.654,1.405H11.943z"
			/>
		</svg>
	)
}


// Place
function LocationSvg(props: IconProps) {
	return (
		<svg
			className="icon"
			viewBox="0 0 512 512"
		>
			<path
				fill={props.active ? 'white' : props.entity.color}
				d="M256,22.709c-85.1,0-154.334,69.234-154.334,154.333c0,34.275,21.887,90.155,66.908,170.834c31.846,57.063,63.168,104.643,64.484,106.64L256,489.291l22.941-34.774c1.318-1.998,32.641-49.578,64.484-106.64c45.023-80.68,66.908-136.559,66.908-170.834C410.334,91.943,341.1,22.709,256,22.709z M256,256c-44.182,0-80-35.817-80-80s35.818-80,80-80s80,35.817,80,80S300.182,256,256,256z" />
		</svg>
	)
}

// Date
function DateSvg(props: IconProps) {
	const bgColor = props.active ? props.entity.color : 'white'
	const fgColor = props.active ? 'white' : props.entity.color

	return (
		<svg
			className="icon"
			style={{ width: 18, height: 18, marginRight: '.35em' }}
			viewBox="0 0 150 150"
		>
			<rect x="0" y="0" width="150" height="150" rx="0" ry="0" fill={bgColor} />

			<rect x="40" y="0" height="30" width="30" fill={fgColor} />
			<rect x="80" y="0" height="30" width="30" fill={fgColor} />
			<rect x="120" y="0" height="30" width="30" fill={fgColor} />

			<rect x="0" y="40" height="30" width="30" fill={fgColor} />
			<rect x="40" y="40" height="30" width="30" fill={fgColor} />
			<rect x="80" y="40" height="30" width="30" fill={fgColor} />
			<rect x="120" y="40" height="30" width="30" fill={fgColor} />

			<rect x="0" y="80" height="30" width="30" fill={fgColor} />
			<rect x="40" y="80" height="30" width="30" fill={fgColor} />
			<rect x="80" y="80" height="30" width="30" fill={fgColor} />
			<rect x="120" y="80" height="30" width="30" fill={fgColor} />

			<rect x="0" y="120" height="30" width="30" fill={fgColor} />
			<rect x="40" y="120" height="30" width="30" fill={fgColor} />
		</svg>
	)
}

// Art work
// function ArtworkSvg(props: IconProps) {
// 	return (
// 		<svg
// 			className="icon"
// 			viewBox="0 0 100 100"
// 		>
// 			<g
// 				transform="translate(-5e-4)"
// 				fill={props.active ? 'white' : props.config.color}
// 			>
// 				<path
// 					d="m 51.263,23.333 c 2.549,0.615 6.502,2.458 7.93,6.265 0.83,2.209 0.774,7.062 0.586,10.747 -0.674,3.906 -2.234,6.754 -4.662,8.482 -3.25,2.313 -7.322,2.075 -9.288,1.774 C 43.146,49.289 41.563,45.3 40.876,42.044 40.072,38.239 40.56,36.255 40.56,36.255 V 34.83 c -0.714,-1.903 -0.079,-7.533 0.872,-9.437 0.951,-1.903 3.974,-1.934 4.837,-2.617 1.208,-0.954 2.833,-5.08 3.309,-6.334 -9.906,1.245 -12.379,9.59 -12.862,11.806 -1.181,1.126 -2.151,3.148 -1.163,5.336 -0.354,0.455 -0.71,1.078 -0.852,1.861 -0.118,0.654 -0.114,1.613 0.443,2.729 -0.984,1.906 -3.084,7.236 -0.784,14.809 2.218,7.308 1.275,9.263 0.666,10.154 -1.493,0.588 -6.417,2.816 -8.482,7.354 -0.591,0.262 -1.244,0.684 -1.859,1.282 V 83.65 H 75.456 V 63.17 C 73.977,60.998 72.252,58.649 70.753,57.102 70.341,54.733 68.3,42.847 68.231,38.694 68.192,36.353 68.102,30.87 66.102,25.903 63.774,20.116 59.507,16.839 53.71,16.348 h -3.14 c -3.697,6.073 -0.133,6.786 0.693,6.985 z m 9.278,37.706 c 0,0.639 0.248,1.215 0.649,1.646 -0.348,0.307 -0.571,0.748 -0.571,1.248 0,0.227 0.047,0.44 0.129,0.641 -0.519,0.484 -0.842,1.172 -0.842,1.938 0,0.465 0.12,0.9 0.329,1.281 -0.538,0.438 -0.887,1.104 -0.887,1.852 0,0.383 0.094,0.744 0.256,1.064 -2.313,1.068 -4.934,4.326 -4.934,4.326 C 49.438,75.431 37.462,73.527 36.986,69.562 36.509,65.597 47.85,57.113 47.85,57.113 c 0,-0.488 -0.272,-2.703 -0.48,-4.324 0.296,0.016 0.606,0.025 0.928,0.025 2.354,0 5.341,-0.476 7.968,-2.338 1.258,-0.892 2.314,-2.023 3.174,-3.38 0.175,5.104 1.338,11.286 1.338,11.286 l 0.767,0.697 c -0.608,0.441 -1.004,1.153 -1.004,1.96 z"
// 				/>
// 				<path
// 					d="m 88.426,92.723 c 0.271,-0.178 0.531,-0.387 0.771,-0.627 1.862,-1.861 1.862,-4.881 0,-6.74 -0.523,-0.524 -1.14,-0.896 -1.794,-1.125 0.797,-2.676 2.265,-9.848 -0.647,-20.201 1.785,-0.305 3.146,-1.854 3.146,-3.727 0,-1.139 -0.504,-2.158 -1.299,-2.852 1.83,-1.365 3.088,-4.188 3.088,-7.452 0,-3.263 -1.258,-6.085 -3.088,-7.45 0.795,-0.694 1.299,-1.713 1.299,-2.851 0,-1.871 -1.359,-3.421 -3.146,-3.726 2.582,-9.182 1.724,-15.86 0.938,-19.121 0.547,-0.231 1.059,-0.566 1.505,-1.012 1.862,-1.862 1.862,-4.88 0,-6.742 C 88.96,8.857 88.699,8.648 88.427,8.47 88.851,8.27 89.253,7.993 89.613,7.635 91.107,6.142 91.241,3.853 89.912,2.525 88.585,1.196 86.296,1.33 84.802,2.823 84.446,3.18 84.169,3.584 83.968,4.008 83.789,3.734 83.58,3.475 83.341,3.235 81.481,1.374 78.46,1.374 76.6,3.235 76.259,3.575 75.987,3.955 75.77,4.358 73.831,3.666 69.667,2.704 63.819,4.169 c -0.56,-1.394 -1.918,-2.38 -3.512,-2.38 -1.14,0 -2.156,0.502 -2.853,1.297 C 56.086,1.257 53.265,0 50,0 46.737,0 43.916,1.257 42.55,3.086 41.857,2.292 40.836,1.79 39.699,1.79 38.106,1.79 36.745,2.776 36.187,4.17 30.335,2.706 26.174,3.667 24.235,4.359 24.02,3.956 23.745,3.576 23.405,3.236 c -1.862,-1.861 -4.88,-1.861 -6.742,0 -0.24,0.24 -0.449,0.5 -0.626,0.773 C 15.837,3.585 15.558,3.181 15.203,2.824 13.709,1.33 11.421,1.197 10.092,2.526 c -1.328,1.329 -1.193,3.617 0.3,5.11 0.356,0.358 0.761,0.635 1.185,0.835 -0.275,0.179 -0.534,0.387 -0.775,0.628 -1.86,1.861 -1.86,4.88 0,6.742 0.446,0.445 0.958,0.783 1.505,1.014 -0.784,3.262 -1.645,9.939 0.938,19.119 -1.785,0.305 -3.146,1.855 -3.146,3.726 0,1.138 0.502,2.157 1.298,2.851 C 9.565,43.916 8.31,46.739 8.31,50 c 0,3.264 1.257,6.085 3.087,7.451 -0.794,0.693 -1.298,1.713 -1.298,2.852 0,1.871 1.359,3.422 3.146,3.727 -2.914,10.355 -1.446,17.525 -0.648,20.203 -0.654,0.229 -1.271,0.601 -1.795,1.123 -1.86,1.861 -1.86,4.881 0,6.742 0.24,0.238 0.5,0.447 0.773,0.627 -0.424,0.199 -0.827,0.478 -1.185,0.834 -1.493,1.494 -1.628,3.781 -0.3,5.109 1.329,1.33 3.617,1.195 5.111,-0.299 0.356,-0.355 0.634,-0.76 0.834,-1.184 0.178,0.272 0.387,0.532 0.627,0.771 1.861,1.862 4.88,1.862 6.742,0 0.625,-0.623 1.035,-1.379 1.239,-2.179 2.083,0.671 6.074,1.421 11.543,0.052 0.558,1.396 1.918,2.381 3.512,2.381 1.137,0 2.157,-0.502 2.851,-1.297 1.366,1.831 4.188,3.087 7.45,3.087 3.264,0 6.085,-1.256 7.451,-3.086 0.693,0.795 1.713,1.297 2.851,1.297 1.595,0 2.955,-0.984 3.513,-2.381 5.47,1.369 9.461,0.619 11.543,-0.051 0.205,0.799 0.615,1.555 1.24,2.178 1.86,1.863 4.879,1.863 6.739,0 0.24,-0.238 0.449,-0.498 0.627,-0.771 0.201,0.424 0.479,0.828 0.834,1.185 1.494,1.494 3.783,1.629 5.111,0.299 1.329,-1.328 1.194,-3.614 -0.3,-5.108 -0.356,-0.363 -0.757,-0.64 -1.182,-0.839 z M 78.64,86.949 H 21.495 V 13.273 H 78.64 Z"
// 				/>
// 			</g>
// 		</svg>
// 	)
// }

const IconsByType: Record<string, React.FC<IconProps>> = {
	[EntityType.Date]: DateSvg,
	[EntityType.Location]: LocationSvg,
	[EntityType.Person]: PersonSvg,
	// [RsType.Artwork]: ArtworkSvg,
	[EntityType.None]: null,
}

export default IconsByType
