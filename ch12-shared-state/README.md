# Shared State
- 어떤 컴포넌트의 state를 여러 개의 하위 컴포넌트에서 공통적으로 사용하는 경우

# 하위 컴포넌트에서 state 공유하기

## 1. 물의 끓음 여부를 알려주는 컴포넌트
```jsx
function BoilingVerdict(props) {
    if (props.celsius >= 100) {
        return <p>물이 끓습니다.</p>
    } else {
        return <p>물이 끓지 않습니다.</p>
    }
}
```
```jsx
function Calculator(props) {
    const [temperature, setTemperature] = useState('');

    const handleChange = (event) => {
        setTemperature(event.target.value);
    }

    return (
        <fieldset>
            <legend>섭씨 온도를 입력하세요: </legend>
            <input value={temperature} onChange={handleChange} />
            <BoilingVerdict celsius={parseFloat(temperature)}/>
        </fieldset>
    )
}
```
## 2. 입력 컴포넌트 추출하기
```jsx
const scaleNames = {
    c: '섭씨',
    f: '화씨'
}

function TemperatureInput(props) {
    const [temperature, setTemperature] = useState('');

    const handleChange = (event) => {
        setTemperature(event.target.value)
    }

    return (
        <fieldset>
            <legend>온도를 입력해주세요(단위: {scaleNames[props.scale]})</legend>
            <input value={temperature} onChnage={handleChange} />
        </fieldset>
    )
}
```

```jsx
function Calculator(props) {
    return (
        <div>
            <Temperature scale="c" />
            <Temperature scale="f" />
        </div>
    )
}
```
## 3. 온도 변환 함수 작성하기
```js
function toCelsius(fahrenheit) {
    return (fahrenheit - 32) * 5 / 9;
}

function toFahrenheit(celsius) {
    return (celsius * 9 / 5) + 32;
}

function tryConvert(temperature, convert) {
    const input = parseFloat(temperature);
    if (Number.isNaN(input)) {
        return '';
    }
    const output = convert(input);
    const rount = Math.rount(output * 1000) / 1000;
    return rounded.toString();
}
```
```js
tryConvert('abc', toCelsius);
tryConvert('10.22', toFahrenheit);
```

## 4. Shared State 적용하기
- Lifting State Up: state를 상위 컴포넌트로 올리는 것

```jsx
const scaleNames = {
    c: '섭씨',
    f: '화씨'
}

function TemperatureInput(props) {
    const [temperature, setTemperature] = useState('');

    const handleChange = (event) => {
        // 변경 전
        // setTemperature(event.target.value)
        props.onTemperatureChange(event.target.value)
    }

    return (
        <fieldset>
            <legend>온도를 입력해주세요(단위: {scaleNames[props.scale]})</legend>
            <!-- 변경 전 -->
            <!-- <input value={temperature} onChnage={handleChange} /> -->
            <input value={props.temperature} onChnage={handleChange} />
        </fieldset>
    )
}
```
## 5. Calculator 컴포넌트 변경하기
```js
const scaleNames = {
    c: '섭씨',
    f: '화씨'
}
```
```jsx
function BoilingVerdict(props) {
    if (props.celsius >= 100) {
        return <p>물이 끓습니다.</p>
    } else {
        return <p>물이 끓지 않습니다.</p>
    }
}
```
```jsx
function TemperatureInput(props) {
    const handleChange = (event) => {
        props.onTemperatureChange(event.target.value)
    }

    return (
        <fieldset>
            <legend>온도를 입력해주세요(단위: {scaleNames[props.scale]})</legend>
            <input value={props.temperature} onChnage={handleChange} />
        </fieldset>
    )
}
```
```jsx
function Calculator(props) {
    const [temperature, setTemperature] = useState('');
    const [scale, setScale] = useState('c');

    const handleCelsiusChange = (temperature) => {
        setTemperature(temperature);
        setScale('c');
    }

    const handleFahrenheitChange = (temperature) => {
        setTemperature(temperature);
        setScale('f');
    }

    const celsius = scale === 'c' ? tryConvert(temperature, toCelsius) ; temperature;
    const fahrenheit = scale === 'f' ? tryConvert(temperature, toFahrenheit) ; temperature;

    return (
        <div>
            <TemperatureInput
                scale="c"
                temperature={celsius}
                onTemperatureChange={handleCelsiusChange}
            />
            <TemperatureInput
                scale="f"
                temperature={celsius}
                onTemperatureChange={handleFahrenheitChange}
            />
            <BoilingVerdict celsius={parseFloat(temperature)} />
        </div>
    )
}
```