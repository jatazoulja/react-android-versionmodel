# React Android Model/Device list

A Custom library for fetching list of android devices, models, branding and Name.
all list came directly from https://support.google.com/googleplay/answer/1727131?hl=en, to maintain the list will always be up-to-date.

## Getting Started

Installation
`npm i react-android-versionmodel`

## Usage

| fn          | arguments     | remarks                       |
| ----------- | ------------- | ----------------------------- |
| getByDevice | device STRING | get value base on device name |
| getByModel  | model STRING  | get value base on model name  |

expected return:

```
[
	{
		branding:"Samsung"
		device:"starqltechn"
		model:"SM-G9600"
		name:"Galaxy S9"
	}
]
```

## Thanks to

https://github.com/DimiMikadze/react-under-construction
