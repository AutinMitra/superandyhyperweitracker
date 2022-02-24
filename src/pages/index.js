/** @jsx jsx */
import * as React from "react";
import { useState, useEffect, useCallback } from "react";

import { DiseaseModel, DEFAULT_DISEASE_VALUES } from "../services";
import { jsx, Flex, Box, Text, Select } from "theme-ui";
import { InfoCard } from "../components/cards";
import { ModelSlider } from "../components/sliders";
import { DiseaseChart, getChartConfig, id2color } from "../components/charts";

const sliderConfigs = [
  {
    id: "DISTANCING",
    defaultValue: DEFAULT_DISEASE_VALUES["DISTANCING"],
    title: "Social Distancing",
  },
  {
    id: "TESTING_EFFORT",
    defaultValue: DEFAULT_DISEASE_VALUES["TESTING_EFFORT"],
    title: "Testing Effort",
  },
  {
    id: "POPULATION",
    defaultValue: DEFAULT_DISEASE_VALUES["POPULATION"],
    title: "Population",
    step: 1000000,
    min: 0,
    max: 300000000,
  },
  {
    id: "MORTALITY_RATE",
    defaultValue: DEFAULT_DISEASE_VALUES["MORTALITY_RATE"],
    title: "Mortality Rate",
    step: 0.01,
  },
  {
    id: "ASYMPTOMATIC",
    defaultValue: DEFAULT_DISEASE_VALUES["ASYMPTOMATIC"],
    title: "Asymptomatic",
    step: 0.01,
  },
  {
    id: "DELAY_R",
    defaultValue: DEFAULT_DISEASE_VALUES["DELAY_R"],
    title: "Delay R",
    step: 1,
    min: 10,
    max: 14,
  },
  {
    id: "DELAY_Q",
    defaultValue: DEFAULT_DISEASE_VALUES["DELAY_R"],
    title: "Delay Q",
    step: 1,
    min: 2,
    max: 5,
  },
  {
    id: "VACCINE_RATE",
    defaultValue: DEFAULT_DISEASE_VALUES["VACCINE_RATE"],
    title: "Vaccine Rate",
  },
  {
    id: "VACCINE_MAX",
    defaultValue: DEFAULT_DISEASE_VALUES["VACCINE_MAX"],
    title: "Vaccine Max",
  },
  {
    id: "VACCINE_EFFECTIVENESS",
    defaultValue: DEFAULT_DISEASE_VALUES["VACCINE_EFFECTIVENESS"],
    title: "Vaccine Effectiveness",
  },
  {
    id: "DELAY_VACCINE",
    defaultValue: DEFAULT_DISEASE_VALUES["DELAY_VACCINE"],
    title: "Delay Vaccine (Days)",
    step: 1,
    min: 0,
    max: 400,
  },
];

const ChartSidePage = ({chartInfo}) => (
  <Box
      sx={{
        width: "100%",
        height: "100%",
        mr: 2,
        mt: 4,
      }}
    >
      <Text
        sx={{
          fontSize: 5,
          fontWeight: "bold",
        }}
      >
        Disease Spread Simulator
      </Text>
      <DiseaseChart
        options={chartInfo.options}
        data={chartInfo.data}
        sx={{
          height: "100%",
          mt: 3,
        }}
      />
    </Box>
)

const IndexPage = () => {
  const [chartInfo, setChartInfo] = useState({});
  const [modelValues, setModelValues] = useState(DEFAULT_DISEASE_VALUES);
  const [modelData, setModelData] = useState();
  const [currentInput, setCurrentInput] = useState("Cases");

  useEffect(() => {
    let data = new DiseaseModel(modelValues).getData();
    const input2config = {
      Cases: data.covidInfected,
      Deaths: data.dead,
      Asymptomatic: data.asymptomatic,
      Symptomatic: data.symptomatic,
      Vaccinated: data.vaccinated,
    };
    const newChartInfo = getChartConfig(
      input2config[currentInput],
      currentInput
    );
    setModelData(data);
    setChartInfo(newChartInfo);
  }, [modelValues, currentInput]);

  const onSliderChange = useCallback(
    (e) => {
      let newState = {
        ...modelValues,
      };
      newState[e.target.getAttribute("name")] = parseFloat(e.target.value);
      setModelValues(newState);
    },
    [modelValues]
  );

  const onInputBoxChange = useCallback((e) => {
    setCurrentInput(e.target.value);
  }, []);

  if (!modelData) return <div></div>;

  const infected = Math.round(
    modelData.covidInfected.values[modelData.covidInfected.values.length - 1]
  );
  const deaths = Math.round(
    modelData.dead.values[modelData.dead.values.length - 1]
  );
  const asymptomatic = Math.round(
    modelData.asymptomatic.values[modelData.asymptomatic.values.length - 1]
  );
  const symptomatic = Math.round(
    modelData.symptomatic.values[modelData.symptomatic.values.length - 1]
  );
  const vaccinated = Math.round(
    modelData.vaccinated.values[modelData.vaccinated.values.length - 1]
  );

  return (
    <React.Fragment>
      <Flex sx={{
        flexWrap: 'wrap'
      }}>
        <InfoCard sx={{ mr: 2, mb:2, background: id2color['Cases'] }} title="INFECTED" data={infected} />
        <InfoCard sx={{ mr: 2, mb:2, background: id2color['Deaths'], }} title="DEATHS" data={deaths} />
        <InfoCard sx={{ mr: 2, mb:2, background: id2color['Asymptomatic'], color: 'text' }} title="ASYMPTOMATIC" data={asymptomatic} />
        <InfoCard sx={{ mr: 2, mb:2, background: id2color['Symptomatic'] }} title="SYMPTOMATIC" data={symptomatic} />
        <InfoCard sx={{ mr: 2, mb:2, background: id2color['Vaccinated'], color: 'text' }} title="VACCINATED" data={vaccinated} />
      </Flex>
      <Flex
        sx={{
          height: "100%",
          width: "100%",
          flexDirection: ["column", null, null, "row"],
          background: "background",
          mt: [0, null, null, 3],
        }}
      >
        <ChartSidePage chartInfo={chartInfo}/>
        <Box
          sx={{
            width: "100%",
            height: "100%",
            pl: 2,
          }}
        >
          <Box
            sx={{
              background: "black",
              color: "white",
              p: 4,
            }}
          >
            <Text
              sx={{
                fontSize: 5,
                fontWeight: "bold",
              }}
            >
              Control Panel
            </Text>
            <Select
              sx={{
                background: "text",
                color: "background",
                mt: 2,
                mb: 1,
              }}
              onChange={onInputBoxChange}
              defaultValue="Cases"
            >
              <option>Cases</option>
              <option>Deaths</option>
              <option>Asymptomatic</option>
              <option>Symptomatic</option>
              <option>Vaccinated</option>
            </Select>
            {sliderConfigs.map(({ id, title, step, min, max }) => (
              <ModelSlider
                defaultValue={DEFAULT_DISEASE_VALUES[id]}
                onChange={onSliderChange}
                sx={{ mt: 2 }}
                title={title}
                min={min}
                max={max}
                step={step}
                id={id}
                key={id}
              />
            ))}
          </Box>
        </Box>
      </Flex>
    </React.Fragment>
  );
};

export default IndexPage;
