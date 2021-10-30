class LevelMeter extends AudioWorkletProcessor
{
    static get parameterDescriptors()
    {
        return [
        {
            name: "id",
            defaultValue: 0,
            minValue: 0,
            maxValue: 9999,
            automationRate: 'k-rate'
        }];
    }
    process(inputs, outputs, parameters)
    {
        const sourceLimit = Math.min(inputs.length, outputs.length);
        for (var idx = 0; idx < sourceLimit; ++idx)
        {
            var input = inputs[idx];
            var output = outputs[idx];
            var channels = Math.min(input.length, output.length);
            for (var ch = 0; ch < channels; ++ch)
            {
                var samples = input[ch].length;
                var max = 0;
                var tmp = 0;
                for (var i = 0; i < samples; ++i)
                {
                    tmp = Math.abs(input[ch][i]);
                    if (tmp > max) { max = tmp; }
                }
                this.port.postMessage(JSON.stringify(
                {
                    "origin": "LevelMeter",
                    "id": parameters["id"][0],
                    "ch": ch,
                    "value": max,
                }));
            }
        };
        return true;
    };
}
registerProcessor("LevelMeter", LevelMeter);