import { Barchart } from '@gessa/component-library';
import { IRootState } from 'apps/view-page/src/store';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LoadingData from '../components/LoadingData';
import { StackVerticalBarChartDataMapping } from '../data-mapper/stack-vertical-bar-chart';
import { selectThemeContext } from '../newStore/themeContextSlice';
import { getChartDataResource } from '../store/gridDataRenderSlice';

export const StackVerticalBarChart = (props: any) => {
  const [chartData, setChartData] = useState<any>();
  const dispatch = useDispatch();
  const [fontData, setFontData] = useState<any>();
  const rootState = useSelector((state: IRootState) => state);
  const themeData = selectThemeContext(rootState);
  useEffect(() => {
    if (themeData && themeData.length > 0 && themeData[0].font.result) {
      let _themeData = JSON.parse(JSON.stringify(themeData));

      const _fontData = {
        families: themeData[0].font.result.families,
        url: themeData[0].font.result.urls,
        defaultFont: themeData[0].font.result.fonts.h1.fontFamily,
      };
      setFontData(_fontData);
      // console.log(themeData, _fontData);
    }
  }, [themeData]);

  useEffect(() => {
    new Promise((resolve, reject) => {
      if (
        props &&
        props.rawData &&
        props.rawData.report &&
        props.rawData.label
      ) {
        resolve(
          dispatch(
            getChartDataResource({
              label: props.rawData.label || '',
              report: props.rawData.report || '',
              widget_id: props.rawData.id,
            })
          )
        );
      } else {
        const obj = {
          payload: {
            data: [],
          },
        };
        resolve(obj);
      }
    })
      .then((response: any) => {
        const _fontData = {
          families: themeData[0].font.result.families,
          url: themeData[0].font.result.urls,
          defaultFont: themeData[0].font.result.fonts.h1.fontFamily,
        };
        const mapperPayload: any = {
          data: props.rawData,
          fontData: _fontData,
        };
        const obj = StackVerticalBarChartDataMapping(response, mapperPayload);
        setChartData(obj);
      })
      .catch((err: any) => {
        console.log(err);
        return err;
      });
  }, []);

  return props ? (
    chartData ? (
      <Barchart
        {...chartData}
        fontData={fontData}
        onChartClick={props.onChartClick}
      />
    ) : (
      <LoadingData />
    )
  ) : (
    <Barchart
      data={{
        labels: [],
        datasets: [],
      }}
      stacked={false}
      horizontal={true}
    />
  );
};
