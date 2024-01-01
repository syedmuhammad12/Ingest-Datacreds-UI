import React, { useRef, useEffect, useState, Fragment } from "react";
import { useParams } from 'react-router-dom';
import { Modal, Button, ToastContainer, Toast, Form, Row, Col, Spinner, Dropdown, Card } from "react-bootstrap";
import { createWorker } from "tesseract.js";
import { pdfjs } from 'react-pdf';
import PDFJSWorker from 'pdfjs-dist/build/pdf.worker.entry';
import PropTypes from "prop-types";
import "./styles.css";
import axiosInterceptor from '../../../utils/axiosInterceptor'
import '../../../utils/overrideFetch.js'
import 'react-pdf/dist/esm/Page/TextLayer.css';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import axios from 'axios';
import {Tabs, Tab} from "react-bootstrap";
import { faFileDownload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import context from "react-bootstrap/esm/AccordionContext";
import { Bars } from  'react-loader-spinner'

const Canvas = ({ height, width }) => {
  const [mouseDownStart, setMouseDownStart] = useState({
    startX: 0,
    startY: 0,
  });
  const [isDrawingBoundingBox, setIsDrawingBoundingBox] = useState(false);
  const [selectedPosition, setSelectedPosition] = useState({
    s1: 0,
    s2: 0,
    s3: 0,
    s4: 0,
  });
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const fileRef = useRef(null);
  const [showModal, setShowModal] = useState(false);
  const [showJsonModal, setShowJSONModal] = useState(false);
  const [showEditJsonModal, setShowEditJSONModal] = useState(false);
  const [imagePath, setImagePath] = useState("");
  const [rects, setRects] = useState([]);
  const [keyRects, setKeyRects] = useState([]);
  const [checkboxRects, setCheckboxRects] = useState([]);
  const [newRect, setNewRect] = useState();
  const [extText, setExtText] = useState();
  const [extType, setExtType] = useState("");
  const [extKey, setExtKey] = useState();
  const [extKeyName, setExtKeyName] = useState("");
  const [extConfidence, setExtConfidence] = useState(0);
  const [extractedJSON, setExtractedJSON] = useState([]);
  const [checkboxCords, setCheckboxCords] = useState([]);
  const [isDataExtracted, setIsDataExtracted] = useState("");
  const [file, setFile] = useState("");
  
  const [jsonData, setJsonData] = useState("");
  const [annotation, setAnnotation] = useState([]);
  const [tenants, setTenants] = useState([]);
  const [showR2Modal, setShowR2Modal] = useState(false);
  const [pages, setPages] = useState([]);
  const [pageStarts, setPageStarts] = useState([]);
  const [imageScale, setImageScale] = useState(1);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [toastShow, setToastShow] = useState(false);
  const [toastMsg, setToastMsg] = useState({type:"", message:""});
  const [sender, setSender] = useState(0);
  const [receiver, setReceiver] = useState(0);
  const [xmlType, setXmlType] = useState("");
  const [keyNames, setKeyNames] = useState([]);
  const [keysForEdit, setKeysForEdit] = useState([]);
  const [checkboxJsonData, setCheckboxJsonData] = useState([]);
  const [page_no, setPageNo] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const [activeTab, setActiveTab] = useState('Page 1');
  const [templateName, setTemplateName] = useState("linelist");
  const [firstPageData, setFirstPageData] = useState("");
  const [secondPageData, setSecondPageData] = useState("");
  const [irmsJson, setIrmsJson] = useState("");
  const tabNames = Array.from({length: pageCount}, (_,i) => 'Page '+ (i + 1));
  const progress_bar = document.getElementById('progress_bar');
  // get file id from the url parameters
  const { id } = useParams();
  function loader(){
    return (<Bars
      height="80"
      width="80"
      color="#4fa94d"
      ariaLabel="bars-loading"
      wrapperStyle={{marginLeft: '45%'}}
      wrapperClass=""
      visible={true}
    />);
  }
  const getTemplateData = async () => {
    setIsLoading(true);
    return await fetch('/file/view/' + id + '/' + String(page_no)).then(data =>  data.json());
    
  }

  const convert_pdf_img = () => {
    return fetch('/file/convert_pdf_img').then(data => data.json());
  }

  const drawImage = async(scale=1) => {
    if (canvasRef.current) {
      var imageObj = new Image();
      imageObj.crossOrigin = "Anonymous";
      imageObj.src = imagePath;
      imageObj.onload = () => {
        if (imageObj.width > canvasRef.current.width) {
          canvasRef.current.width = imageObj.width;
          // canvasRef.current.width = 1700;
        }

        if (imageObj.height > canvasRef.current.height) {
          canvasRef.current.height = imageObj.height;
          // canvasRef.current.height = 2200;
        }

        // canvasRef.current.width = canvasRef.current.width * scale;
        // canvasRef.current.height = canvasRef.current.height * scale;

        contextRef.current.drawImage(
          imageObj,
          0,
          0,
          canvasRef.current.width,
          canvasRef.current.height
        );
      };
      fileRef.current = imageObj;

    }
  };

  const renderPage = async () => {
    pdfjs.getDocument(imagePath).promise.then(async (pdf) => {
      pdfjs.disableWorker = true;
      let cPages = [];
      let cWidth = 0;
      let cHeight = 0;
      let cPageStarts = [];
      cPageStarts[0] = parseInt(0);
      const scale = 2;
      let result = []
      for (let idx = 1; idx <= pdf.numPages; idx = idx + 1) {
        await pdf.getPage(idx).then(async (page) => {
          const viewport = page.getViewport({ scale: scale });
          var canvas = document.createElement(`canvas`);
          var context = canvas.getContext('2d', { alpha: false });
          canvas.width = viewport.width;
          canvas.height = viewport.height;
          await page.render({ canvasContext: context, viewport: viewport }).promise.then(async () => {
            cPages[idx - 1] = context.getImageData(0, 0, canvas.width, canvas.height);
            cPageStarts[idx] = parseInt(cPageStarts[idx - 1]) + parseInt(canvas.height) + parseInt(2);
            setPages(cPages);
            setPageStarts(cPageStarts);
          });
          cWidth = parseInt(canvasRef.current.width);
          cHeight = parseInt(cHeight) + parseInt(canvas.height);
          if (parseInt(canvasRef.current.width) < parseInt(canvas.width)) {
            cWidth = parseInt(canvas.width);
          }
          canvasRef.current.width = cWidth;
          canvasRef.current.height = cHeight;

          return { cPages: cPages, cPageStarts: cPageStarts, cWidth: cWidth, cHeight: cHeight }
        });
      }
      await renderImages();
    });
  }

  const renderImages = async() => {
    clearCanvas();
    for (let i = 0; i < pages.length; i++) {
      contextRef.current.putImageData(pages[i], 0, parseInt(pageStarts[i]));
    }
  }

  const clearCanvas = () => {
    contextRef.current.clearRect(
      0,
      0,
      canvasRef.current.width,
      canvasRef.current.height
    );
  };

  const getCanvasOffset = () => {
    const canvas = canvasRef.current;
    if (canvas == null) {
      return;
    }
    const canvasBoundingRect = canvas.getBoundingClientRect();
    const canvasOffsetX = canvasBoundingRect.left;
    const canvasOffsetY = canvasBoundingRect.top;
    return { x: canvasOffsetX, y: canvasOffsetY };
  };

  const startDrawing = (e) => {
    e.preventDefault();
    e.stopPropagation();
    let { x, y } = getCanvasOffset();
    const startX = e.clientX - x;
    const startY = e.clientY - y;
    setIsDrawingBoundingBox(true);
    setMouseDownStart({ startX: startX, startY: startY });
  };

  const stopDrawing = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isDrawingBoundingBox) {
      setIsDrawingBoundingBox(false);
      if (newRect.left && newRect.right && newRect.top && newRect.bottom) {
        // if (!willOverlap(newRect)) {
          rects.push(newRect);
          setRects(rects);
          let { s1, s2, s3, s4 } = selectedPosition;
          if (s1 !== 0 && s2 !== 0 && s3 !== 0 && s4 !== 0) {
            // Processing OCR
            await readDataFromRect();
            //if (progress) {
            handleShow();
            //}
          }
        // }
      }
    }
    drawAllRects();
  };

  const readDataFromRect = async () => {

    let { left, right, top, bottom } = newRect;
    const rectangle = {
      left: left,
      top: top,
      width: right - left,
      height: bottom - top,
    };

    const worker = createWorker({
      logger: (m) => { },
    });

    await worker.load();
    await worker.loadLanguage("eng");
    await worker.initialize("eng");
    const {
      data: { text, confidence },
    } = await worker.recognize(canvasRef.current.toDataURL(), { rectangle });
    console.log("Text: " + text)
    console.log("Confidence: " + confidence)
    setExtText(text.trim());
    setExtConfidence(parseInt(confidence));
    await worker.terminate();
  };

  const drawAllRects = () => {
    contextRef.current.save();
    contextRef.current.clearRect(
      0,
      0,
      canvasRef.current.width,
      canvasRef.current.height
    );
    contextRef.current.restore();
    contextRef.current.beginPath();
    // if (String(file.original_file_name).endsWith('.pdf')) {
    //   renderImages();
    // } else if (String(file.original_file_name).endsWith(".png") || String(file.original_file_name).endsWith(".jpg") || String(file.original_file_name).endsWith(".jpeg")) {
      contextRef.current.drawImage(
        fileRef.current,
        0,
        0,
        contextRef.current.canvas.width,
        contextRef.current.canvas.height
        // fileRef.current.width,
        // fileRef.current.height
      );
    // }
    contextRef.current.lineWidth = 1;
    for (var i = 0; i < keyRects.length; i++) {
      var r = keyRects[i];
      contextRef.current.strokeStyle = r.color;
      contextRef.current.strokeRect(
        r.left,
        r.top,
        r.right - r.left,
        r.bottom - r.top
      );
    }


    for (var i = 0; i < rects.length; i++) {
      var r = rects[i];
      contextRef.current.strokeStyle = r.color;
      contextRef.current.strokeRect(
        r.left,
        r.top,
        r.right - r.left,
        r.bottom - r.top
      );
    }

    console.log("checkboxRects----",checkboxRects);

    for (var i = 0; i < checkboxRects.length; i++) {
      var r = checkboxRects[i];
      contextRef.current.strokeStyle = r.color;
      contextRef.current.strokeRect(
        r.left,
        r.top,
        r.right - r.left,
        r.bottom - r.top
      );
    }
  };

  const drawRectangle = (e) => {
    // crossLines(e)
    setSelectedPosition({ s1: 0, s2: 0, s3: 0, s4: 0 });
    if (!isDrawingBoundingBox) return;
    e.preventDefault();
    e.stopPropagation();
    let { startX, startY } = mouseDownStart;
    let { x, y } = getCanvasOffset();
    const newMouseX = e.clientX - x;
    const newMouseY = e.clientY - y;

    setNewRect({
      left: parseInt(Math.min(startX, newMouseX)),
      right: parseInt(Math.max(startX, newMouseX)),
      top: parseInt(Math.min(startY, newMouseY)),
      bottom: parseInt(Math.max(startY, newMouseY)),
    });
    const rectWidth = newMouseX - startX;
    const rectHeight = newMouseY - startY;
    drawAllRects();
    contextRef.current.strokeStyle = "red";
    contextRef.current.strokeRect(startX, startY, rectWidth, rectHeight);
    contextRef.current.stroke();
    contextRef.current.closePath();
    setSelectedPosition({
      s1: startX,
      s2: startY,
      s3: rectWidth,
      s4: rectHeight,
    });
  };

  const willOverlap = (nRect) => {
    // shortcut to the new potential rect
    var r2 = nRect;

    // test if one rect is completely inside another rect
    var isInside = (rect1, rect2) => {
      return (
        rect2.left >= rect1.left &&
        rect2.right <= rect1.right &&
        rect2.top >= rect1.top &&
        rect2.bottom <= rect1.bottom
      );
    };

    // test if the new rect is overlapping any existing rect
    var isOverlapping = false;
    for (var i = 0; i < rects.length; i++) {
      var r1 = rects[i];
      //
      var isIntersecting = !(
        r2.left > r1.right ||
        r2.right < r1.left ||
        r2.top > r1.bottom ||
        r2.bottom < r1.top
      );
      //
      var isContained = isInside(r1, r2) || isInside(r2, r1);
      //
      if (isIntersecting || isContained) {
        isOverlapping = true;
      }
    }
    return isOverlapping;
  };

  const handleClose = () => {
    setShowModal(false);
  };
  const handleShow = () => setShowModal(true);

  const removeBoundingBox = () => {
    let { left, right, top, bottom } = newRect;
    rects.pop();
    setRects(rects);
    contextRef.current.clearRect(left, top, right - left, bottom - top)
    contextRef.current.stroke();
    contextRef.current.closePath();
    drawAllRects();
  }

  const removeBoundingBoxPair = (data) => {

    var index = extractedJSON.findIndex(item => item.key === data);
    // alert(index);
    extractedJSON.splice(index, 1);
    setExtractedJSON(extractedJSON);

    keysForEdit.splice(index, 1);
    setKeysForEdit(keysForEdit);
    
    rects.splice(index, 1);
    setRects(rects);

    keyRects.splice(index, 1);
    setKeyRects(keyRects);

    drawAllRects();
    drawRectangle();
  }

  const addToExtractedJSON = () => {
    if ((extKey !== "" || extType !== "") && extText !== "") {
      let { left, right, top, bottom } = newRect;
      if (extType === "0") {
        console.log(extKeyName)
        annotation.push({ "key": extText, "key_name": extKeyName });
        setAnnotation(annotation);
        rects.pop();
        setRects(rects);
        contextRef.current.clearRect(left, top, right - left, bottom - top)
        contextRef.current.stroke();
        contextRef.current.closePath();
        drawAllRects();
      } else if (extType === "1") {
        extractedJSON.push({
          key: extKey,
          key_name: extKeyName,
          value: extText,
          confidence_score: extConfidence,
          Xmin: left,
          Xmax: right,
          Ymin: top,
          Ymax: bottom
        });
        setExtractedJSON(extractedJSON);
        keysForEdit.push(extKey);
        setKeysForEdit(keysForEdit);
      }
      setExtText("");
      setExtKey("");
      setExtType("");
      setExtConfidence(0);
      handleClose();
    }
  };

  const setNewRectCoords = (m_data) => {
    if(isDataExtracted == "1"){
      console.log("m_data---", m_data)
      rects.push({
        color: "green",
        left: parseInt(m_data['Xmin']),
        right: parseInt(m_data['Xmax']),
        top: parseInt(m_data['Ymin']),
        bottom: parseInt(m_data['Ymax']),
      });
    }else{
      var key = m_data['key'];
      var value = m_data['value'];

      keyRects.push({
        color: "blue",
        left: parseInt(key['x']),
        right: parseInt(key['w']) + parseInt(key['x']),
        top: parseInt(key['y']),
        bottom: parseInt(key['h']) + parseInt(key['y']),
      });

      rects.push({
        color: "green",
        left: parseInt(value['x']),
        right: parseInt(value['w']) + parseInt(value['x']),
        top: parseInt(value['y']),
        bottom: parseInt(value['h']) + parseInt(value['y']),
      });
    }
    
    setKeyRects(keyRects);
    setRects(rects);
  }

  const setCheckboxRectCoords = (m_data) => {
    if(isDataExtracted == "1"){
      console.log("m_data---", m_data)
      rects.push({
        color: "green",
        left: parseInt(m_data['Xmin']),
        right: parseInt(m_data['Xmax']),
        top: parseInt(m_data['Ymin']),
        bottom: parseInt(m_data['Ymax']),
      });
    }else{
      checkboxRects.push({
        color: "green",
        left: parseInt(m_data['Xmin']),
        right: parseInt(m_data['Xmax']),
        top: parseInt(m_data['Ymin']),
        bottom: parseInt(m_data['Ymax']),
      });
    }
    
    setCheckboxRects(checkboxRects);
  }

  const highlightCordinates = () => {
    var edit_keys = [];
    var first_page_data = [];
    for(var i=0; i< jsonData.length; i++){
      if(isDataExtracted == "1"){
        var n_data = jsonData[i];
        first_page_data.push(n_data);
        
      }else{
        var n_data = {
          "key": jsonData[i]['key']['text'],
          "value": jsonData[i]['value']['text'],
          "Xmin": jsonData[i]['value']['x'],
          "Xmax": parseInt(jsonData[i]['value']['w']) + parseInt(jsonData[i]['value']['x']),
          "Ymin": jsonData[i]['value']['y'],
          "Ymax": parseInt(jsonData[i]['value']['h']) + parseInt(jsonData[i]['value']['y'])
        }
        keysForEdit.push(jsonData[i]['key']['text']);

        if(templateName == "IRMS"){
          first_page_data.push(n_data);
        }
      }
      extractedJSON.push(n_data);
      setExtractedJSON(extractedJSON);
      setNewRectCoords(jsonData[i]);
    }
    
    setKeysForEdit(keysForEdit);
    var m_data = [];
    m_data.push(JSON.stringify({"template_name": templateName}));
    m_data.push(JSON.stringify({"first_page_data": first_page_data}));
    if(templateName == "IRMS"){
      m_data.push(secondPageData);
    }else{
      m_data.push(JSON.stringify({"from_second_page": secondPageData}));
    }
    setIrmsJson(m_data)
    console.log("test data",JSON.stringify(m_data));


    for(var j=0; j<checkboxJsonData.length; j++){
      var value_cors = checkboxJsonData[j]['values_cors'];
      var key_cors = checkboxJsonData[j]['key_cors'];
      var value = checkboxJsonData[j]['values'];

      console.log("---", value)

      // if(value.length > 1){

      // }else if(value.length == 1){
        if(value.includes("1") || value.includes(1)){
          for(var i=0; i<key_cors.length; i++){
            var [x,y,w,h] = key_cors[i].split(":");
            var n_data = {
              "key": "",
              "value": "",
              "Xmin": x,
              "Ymin": y,
              "Xmax": parseInt(w)+parseInt(x),
              "Ymax": parseInt(h)+parseInt(y)
            }
            checkboxCords.push(n_data);
            setCheckboxCords(checkboxCords);
            setCheckboxRectCoords(n_data);
          }
        }
      // }


      // for(var i=0; i<key_cors.length; i++){
      //   var [x,y,w,h] = key_cors[i].split(":");
      //   var n_data = {
      //     "key": "",
      //     "value": "",
      //     "Xmin": x,
      //     "Ymin": y,
      //     "Xmax": parseInt(w)+parseInt(x),
      //     "Ymax": parseInt(h)+parseInt(y)
      //   }
      //   checkboxCords.push(n_data);
      //   setCheckboxCords(checkboxCords);
      //   setCheckboxRectCoords(n_data);
      //   console.log("corrs---",checkboxCords)
      // }

      // for(var r=0; r<value.length;r++){
      //   if(value[r] == 1){
      //     var [x,y,w,h] = value_cors[r].split(":");
      //     console.log(x,"--",y,"--",w,"--",h)

      //     var n_data = {
      //       "key": "",
      //       "value": "",
      //       "Xmin": x,
      //       "Ymin": y,
      //       "Xmax": w,
      //       "Ymax": h
      //     }

      //     checkboxCords.push(n_data);
      //     setCheckboxCords(checkboxCords);
      //     setCheckboxRectCoords(n_data);
      //   }
      // }
    }
  
  }

  const viewPage = (pageno) => {
    // page_no = pageno
    setPageNo(pageno);
    // getTemplateData().then(item => {
    //   setTemplateData(item);
    // });
  }

  const setTemplateData = (item) => {
    setKeyRects([]);
    setRects([]);
    setNewRect();
    setExtText("");
    setExtKey("");
    setExtConfidence(0);
    setExtractedJSON([]);
    setFile(item.file_data);
    setKeyNames(item.key_names);
    setTemplateName(item.template_name);
    setIsDataExtracted(item.is_data_extracted);
    setPageCount(item.page_count);


    if(item.template_name == "IRMS" || "CIOMS"){
      if(item.json_data != ""){
        var second_page_data = item.from_second_page;
        setSecondPageData(second_page_data);
      }
    }

    if(item.json_data != ""){
      var n_data = item.json_data.replace(/\\n/g, '');
      n_data = JSON.parse(n_data);
      if(item.is_data_extracted == "1"){
        setJsonData(n_data);
      }else{
        // var checkboxjson = [{"key": "20. DID REACTION ABATE AFTER STOPPING DRUG?", "key_name": "20._DID_REACTION_ABATE_AFTER_STOPPING_DRUG?", "key_cors": ['1315:450:74:11','1395:450:22:11', '1395:450:22:11','1315:466:95:11', '1315:466:95:11','1417:466:76:11', '1417:466:76:11','1315:483:132:11'], "values": [0, 1, 0], "values_cors": ['1287:908:1310:936', '1357:909:1381:935', '1426:909:1450:933']}, {"key": "CONGENITAL ANOMALY", "key_name": "CONGENITAL_ANOMALY", "key_cors": ['1314:644:97:11', '1314:661:73:11'], "values": [0], "values_cors": ["1273:643:1299:669"]}, {"key": "CONGENITAL ANOMALY / BIRTH DEFECT", "key_name": "CONGENITAL_ANOMALY", "key_cors": ['1314:644:97:11', '1314:661:73:11'], "values": [0], "values_cors": ["1273:643:1299:669"]}, {"key": "INVOLVED OR PROLONGED INPATIENT HOSPITALISATION", "key_name": "INVOLVED_OR_PROLONGED_INPATIENT_HOSPITALISATION", "key_cors": ['1315:450:74:11', '1395:450:22:11', '1395:450:22:11', '1315:466:95:11', '1315:466:95:11', '1417:466:76:11', '1417:466:76:11', '1315:483:132:11'], "values": [1], "values_cors": ["1272:447:1298:473"]}, {"key": "INVOLVED OR PROLONGED INPATIENT HOSPITALIZATION", "key_name": "INVOLVED_OR_PROLONGED_INPATIENT_HOSPITALISATION", "key_cors": ['1315:450:74:11', '1395:450:22:11', '1395:450:22:11', '1315:466:95:11', '1315:466:95:11', '1417:466:76:11'], "values": [1], "values_cors": ["1272:447:1298:473"]}, {"key": "INVOLVED PERSISTENT OR SIGNIFICANT DISABILITY OR INCAPACITY", "key_name": "INVOLVED_PERSISTENT_OR_SIGNIFICANT_DISABILITY_OR_INCAPACITY", "key_cors": ['1315:505:74:11', '1395:505:95:11', '1395:505:95:11', '1401:539:22:11', '1314:522:22:11', '1342:522:95:11', '1342:522:95:11', '1315:539:81:11', '1315:539:81:11', '1401:539:22:11', '1314:522:22:11', '1315:555:89:11'], "values": [0], "values_cors": ["1273:502:1299:530"]}, {"key": "LIFE THREATENING", "key_name": "LIFE_THREATENING", "key_cors": ['1315:589:30:11', '1314:605:107:11'], "values": [1], "values_cors": ["1273:586:1298:613"]}, {"key": "OTHER", "key_name": "OTHER_MEDICALLY_IMPORTANT_CONDITION", "key_cors": ['187:1405:53:11', '1314:700:53:11'], "values": [1], "values_cors": ["1272:699:1299:724"]}, {"key": "PATIENT DIED", "key_name": "PATIENT_DIED", "key_cors": ['1315:394:61:11', '1381:394:35:11'], "values": [0], "values_cors": ['1275:393:1297:417']}];
        // setCheckboxJsonData(checkboxjson);
        setJsonData(n_data.data);
      }
    }

    if(item.check_box_data != ""){
      var n_data = item.check_box_data.replace(/\\n/g, '');
      n_data = JSON.parse(n_data);
      if(item.is_data_extracted == "1"){

      }else{
        console.log("---------", n_data)
        setCheckboxJsonData(n_data)
      }
    }


    setImagePath(item.data);
  }

  useEffect(() => {
    // convert_pdf_img().then(item => {
    //   console.log("hey")
    // })
    getTemplateData().then(item => {
      setTemplateData(item);
    });
  }, [page_no]);

  useEffect(async () => { 
    pdfjs.GlobalWorkerOptions.workerSrc = PDFJSWorker;
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = width;
      canvas.height = height;
      const context = canvas.getContext("2d", [{ willReadFrequently: true }]);
      context.lineCap = "round";
      context.strokeStyle = "red";
      context.lineWidth = 2;
      context.textAlign = "center";
      contextRef.current = context;
      if (file.original_file_name !== "") {
        // if (String(file.original_file_name).endsWith('.pdf')) {
        //   await renderPage(); 
        // } else if (String(file.original_file_name).endsWith(".png") || String(file.original_file_name).endsWith(".jpg") || String(file.original_file_name).endsWith(".jpeg")) {
          await drawImage();
        // }
      }

      if(jsonData != ""){
        console.log(jsonData);
        setTimeout(() => {
          highlightCordinates();
          drawAllRects();
        }, 5000);
      }
    }
  }, [width, height, imagePath]);

  const zoomin = (event) => {
    const canvas = canvasRef.current;
    setImageScale(imageScale + 0.2);
    contextRef.current.scale(imageScale, imageScale);
    // imageScale = imageScale + 0.2;
    console.log("imageScale ++", imageScale);
    drawImage(imageScale);
  }

  const zoomout = (event) => {
    const canvas = canvasRef.current;
    // if(imageScale-0.2 >= 1){
    setImageScale(imageScale - 0.2);
    console.log("imageScale --", imageScale)
    contextRef.current.scale(imageScale, imageScale);
    // imageScale = imageScale - 0.2;
    drawImage(imageScale);
    // }
  }

  const hide_json_modal = () => {
    setShowJSONModal(false);
  }

  const view_json_modal = async() => {
    setShowJSONModal(true);
    if(String(file.file_template_id.file_type).toLowerCase() == 'unstructured' && extractedJSON.length == 0) {
      await loadAnnotations("view");
    }
  }

  const hide_edit_json_modal = () => {
    setShowEditJSONModal(false);
  }

  const edit_json_modal = async() => {
    setShowEditJSONModal(true);

  }

  const download_json_file = async() => {
    if(String(file.file_template_id.file_type).toLowerCase() == 'unstructured' && extractedJSON.length == 0) {
      await loadAnnotations("download_json");
    } else {
      const fileData = JSON.stringify(extractedJSON);
      const blob = new Blob([fileData], {type: "text/plain"});
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      var file_name = file.original_file_name.split('.').slice(0, -1).join('.')
      link.download = file_name + '.json';
      link.href = url;
      link.click();
    }
  }

  const upload_extracted_data = async(data) => {
    progress_bar.style.display = 'block';
    console.log(id)
    var result=await axiosInterceptor({
      method: "POST",
      url: "/file/upload_extracted_data/"+id,
      data: data
    });
    if (result['data']['error']==0){
      setToastMsg({type:"Success", message:result['data']['message']});
      setToastShow(true);
      progress_bar.style.display = 'none';
      return result
    }
     
  }

  const save_extracted_file = async() => {
    if(String(file.file_template_id.file_type).toLowerCase() == 'unstructured' && extractedJSON.length == 0) {
      await loadAnnotations("save");
    } else {
      const fileData = JSON.stringify(extractedJSON);
      const blob = new Blob([fileData], {type: "text/plain"});
      const data = new FormData();
      console.log(data);
      console.log(
      data.append('file_id', id);
      data.append('file_name', blob, '1.json');
      upload_extracted_data(data);
    }
  }

  const showXMLModal = async(xml_type) => {
    setXmlType(xml_type)
    setShowR2Modal(true);
    setTenants([]);
    await axiosInterceptor({
      method: "get",
      url: "/company/",
      headers: { "Content-Type": "application/json" },
    }).then((result)=> {
      setTenants(result.data)
      setSender(0);
      setReceiver(0);
    });
  }

  const closeR2Modal = () => {
    setShowR2Modal(false)
  }

  const loadAnnotations = (async(type) => {
    await axiosInterceptor({
      method: "post",
      url: "/ner/extract/",
      data: {'file_id': id, 'type': 'json'},
      headers: { "Content-Type": "application/json" },
    }).then((result)=> {
      setExtractedJSON(result.data.annotations);
      if (type == 'download_json') {
        const fileData = JSON.stringify(result.data.annotations);
        const blob = new Blob([fileData], {type: "text/plain"});
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        var file_name = file.original_file_name.split('.').slice(0, -1).join('.')
        link.download = file_name + '.json';
        link.href = url;
        link.click();
      } else if (type == 'save') {
        const fileData = JSON.stringify(result.data.annotations);
        const blob = new Blob([fileData], {type: "text/plain"});
        const data = new FormData();
        data.append('file_id', id);
        data.append('file_name', blob, '1.json');
        upload_extracted_data(data);
      }
    });
  })
  function convertStringToByteArray(str) {                                                                                                                                      
    var bytes = [];                                                                                                                                                             
    for (var i = 0; i < str.length; ++i) {                                                                                                                                      
      bytes.push(str.charCodeAt(i));                                                                                                                                            
    }                                                                                                                                                                           
    return bytes                                                                                                                                                                
  }
  const downloadXml = (async() => {
    setIsDownloading(true);
    console.log(file);
    closeR2Modal();
    if(String(file.file_template_id.file_type).toLowerCase() == 'unstructured') {
      await axiosInterceptor({
        method: "post",
        url: "/ner/extract/",
        data: {
          'file_id': id, 
          'type': 'xml_download',
          'sender': sender,
          'receiver': receiver,
          'xmlType': xmlType
        },
        headers: { "Content-Type": "application/json" },
      }).then((response)=> {
        setIsDownloading(false);
        if (String(response.data.error) === "0") {
          const blob = new Blob([String(response.data.data)], {type: "text/xml"});
          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');
          var file_name = file.original_file_name.split('.').slice(0, -1).join('.')
          link.download = file_name + '.xml';
          link.href = url;
          link.click();
        } else {
          setToastMsg({type:"Danger", message:response.data.msg});
          setToastShow(true);
        }
      }).catch((e) => {
        setIsDownloading(false);
        console.log("error")
        console.log(e)
      });
    } else if(String(file.file_template_id.template_name).toLowerCase() == 'linelist'){
      await axiosInterceptor({
        method: "post",
        url: "/r2xml/linelist",
        data: {
          'file_id': id, 
          'type': 'xml_download',
          'sender': sender,
          'receiver': receiver,
          'xml_type': xmlType,
        },
        headers: { 'Content-Type': 'application/json' },
        responseType: 'blob',
        
      }).then((response)=> {
        setIsDownloading(false);
        if (response) {
          console.log(response);
          console.log(response.data);
          const url = URL.createObjectURL(response.data);
          console.log(url);
          const link = document.createElement('a');
          var file_name = file.original_file_name.split('.').slice(0, -1).join('.')
          link.download = file_name + '.zip';
          link.href = url;
          link.click();
        } else {
          setToastMsg({type:"Danger", message:response.data.msg});
          setToastShow(true);
        }
      }).catch((e) => {
        setIsDownloading(false);
        console.log("error")
        console.log(e)
      });

    }else {
      await axiosInterceptor({
        method: "post",
        url: "/r2xml/",
        data: {
          'file_id': id, 
          'type': 'xml_download',
          'sender': sender,
          'receiver': receiver,
          'xml_type': xmlType,
          'json': irmsJson
        },
        headers: { "Content-Type": "application/json" },
      }).then((response)=> {
        setIsDownloading(false);
        if (String(response.data.error) === "0") {
          const blob = new Blob([String(response.data.data)], {type: "text/xml"});
          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');
          var file_name = file.original_file_name.split('.').slice(0, -1).join('.')
          link.download = file_name + '.xml';
          link.href = url;
          link.click();
        } else {
          setToastMsg({type:"Danger", message:response.data.msg});
          setToastShow(true);
        }
      }).catch((e) => {
        setIsDownloading(false);
        console.log("error")
        console.log(e)
      });
      // setIsDownloading(false);
      // alert("Under Development")
    }
  })

  useEffect(async () => {
    // await axios({
    //   method: "post",
    //   url: "/structured/create_training_file/",
    //   data: {
    //     'file_id': id
    //   },
    //   headers: { "Content-Type": "application/json" },
    // }).then((response)=> {
    // console.log(response)
    // })

  }, [])

  return (
    <Fragment>
      <Card className="m-0">
        <Card.Body>
          <Row className="mb-1">
            <Col> { 
            file.original_file_name ?
            <div>
              <b>
                { file.file_template_id.template_name } ( 
              </b> {file.original_file_name } <b>)</b>
            </div> 
            : null
            }
            </Col>
            <Col>
              <Dropdown className="me-2 pull-right">
                <Dropdown.Toggle variant="primary">
                  {
                    isDownloading 
                    ? 
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                    />
                    : "XML"
                  }
                </Dropdown.Toggle>
                {
                  !isDownloading ? 
                  <Dropdown.Menu>
                    <Dropdown.Item href="#" onClick={()=>showXMLModal("R2")}>R2XML</Dropdown.Item>
                    <Dropdown.Item href="#" onClick={()=>showXMLModal("R3")}>R3XML</Dropdown.Item>
                  </Dropdown.Menu>
                  : null
                }
              </Dropdown>
              <div>
              
              { templateName!='linelist' && templateName!='MedWatch' && templateName!='full text articles'?
                  
                <Dropdown className="me-2 pull-right">
                <Dropdown.Toggle variant="primary">
                  JSON
                </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item href="#" onClick={view_json_modal}>View JSON</Dropdown.Item>
                    {/* <Dropdown.Item href="#" onClick={edit_json_modal}>Edit JSON</Dropdown.Item> */}
                    <Dropdown.Item href="#" onClick={download_json_file}>Download JSON</Dropdown.Item>
                    <Dropdown.Item href="#" onClick={save_extracted_file}>Save JSON</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              :null
                
              }
              </div>
              
            </Col>
          </Row>
          <Row className="mb-1">
            <Col>
              <Tabs activeKey={activeTab} defaultActiveKey="Page 1" onSelect={(eventKey) => setActiveTab(eventKey)}>
                {tabNames.map((tabName, index) => (
                  <Tab key={index} eventKey={tabName} title={tabName} onClick={() => viewPage(index + 1)}>
                    {activeTab}
                  </Tab>
                ))}
              </Tabs>
                
            </Col>
          </Row>
          <Row lg={12} md={12} sm={12}>
            {file.file_name ? String(file.file_template_id.file_type).toLowerCase() == 'unstructured'? 
            <div id="container">
              <canvas
                id="canvas"
                width={width}
                height={height}
                ref={canvasRef}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
              >
                Oops! Your browser doesn't support the canvas component.
              </canvas>
            </div>
            :
            <div id="container">
              <canvas
                id="canvas"
                width={width}
                height={height}
                ref={canvasRef}
                // onMouseDown={startDrawing}
                // onMouseMove={drawRectangle}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
              >
                Oops! Your browser doesn't support the canvas component.
              </canvas>
            </div>
            : loader()
            }
          </Row>
        </Card.Body>
      </Card>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Extract</Modal.Title>
        </Modal.Header>
        <Modal.Header>
          <Button variant="primary" onClick={removeBoundingBox}>
            Remove Bounding Box
          </Button>
        </Modal.Header>
        <Form className="form px-5">
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Value</Form.Label>
              <Form.Control
                as="textarea"
                value={extText}
                rows={3}
                onChange={(e) => setExtText(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Type</Form.Label>
              <Form.Select
                aria-label="Select Type"
                onChange={(e) => setExtType(e.target.value)}
              >
                <option value="">Select Type</option>
                <option value="0">Key</option>
                <option value="1">Value</option>
              </Form.Select>
            </Form.Group>
            {
              extType === "0" ? (
                <Form.Group className="mb-3">
                  <Form.Label>Key Name</Form.Label>
                  <Form.Select aria-label="Select Key Name"
                    onChange={(e) => setExtKeyName(e.target.value)}>
                    <option>Select Key Name</option>
                    {
                      keyNames.map((data, j) => (
                        <option key={j}>{data}</option>
                      ))
                    }
                  </Form.Select>
                </Form.Group>
              ) : null
            }

            {extType === "1" ? (
              <Form.Group className="mb-3">
                <Form.Label>Key</Form.Label>
                <Form.Select
                  aria-label="Select Key"
                  onChange={(e) => setExtKey(e.target.value)}
                >
                  <option>Select Key</option>
                  {annotation.map((data, i) => (
                    <option key={i}>{data.key}</option>
                  ))}
                </Form.Select>
              </Form.Group>
            ) : null}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={addToExtractedJSON}>
              Save Extracted Text
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      <Modal show={showEditJsonModal}
        onHide={hide_edit_json_modal}
        backdrop="static"
        keyboard={false}
        size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Remove Key Pair From JSON</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div className="text-left p-1 result-display">
          {
            keysForEdit.length > 0 ? (
              keysForEdit.map((keyName, j) => (
                <Col md="12" key={j} style={{marginBottom: "10px"}}>
                  <Row>
                    <Col md="10">{keyName}</Col>
                    <Col md="2">
                      <Button variant="primary" onClick={() => removeBoundingBoxPair(keyName)}>
                        Delete
                      </Button>
                    </Col>
                  </Row>
                </Col>
              ))
            ) : 
            <div className="text-center">
              <Spinner
                as="span"
                animation="border"
                size="md"
                role="status"
                aria-hidden="true"
              />
            </div>
            }
          </div>
        </Modal.Body> 
        <Modal.Footer>
          <Button variant="primary" onClick={hide_edit_json_modal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showJsonModal}
        onHide={hide_json_modal}
        backdrop="static"
        keyboard={false}
        size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Extracted Data</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="text-left p-1 result-display">
            {
            extractedJSON.length > 0 ? (
              <div className="small">
                <pre>{JSON.stringify(extractedJSON, null, 2)}</pre>
              </div>
            ) : 
            <div className="text-center">
              <Spinner
                as="span"
                animation="border"
                size="md"
                role="status"
                aria-hidden="true"
              />
            </div>
            }
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={hide_json_modal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
          show={showR2Modal}
          onHide={ closeR2Modal }
          backdrop="static"
          keyboard={false}
          size="md"
      >
          <Modal.Header closeButton>
              <Modal.Title>{xmlType}XML Sender/Receiver</Modal.Title>
          </Modal.Header>
          <Modal.Body className="text-center">
            {
              tenants.length == 0
              ?
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              /> :
              <div>
                <Form.Group className="mb-3">
                  <Form.Select onChange={(e) => setSender(e.target.value)}>
                    <option value="0">Select Sender</option>
                    {
                      tenants.map((tenant, i) => {
                        return <option key={`sender_${i}`} value={tenant.company_abrre}>{tenant.company_name}</option>
                      })
                    }
                  </Form.Select>
                </Form.Group>
                <Form.Group className="mb-1">
                  <Form.Select onChange={(e) => setReceiver(e.target.value)}>
                    <option value="0">Select Receiver</option>
                    {
                      tenants.map((tenant, i) => {
                        return <option key={`receiver_${i}`} value={tenant.company_abrrev}>{tenant.company_name}</option>
                      })
                    }
                  </Form.Select>
                </Form.Group>
              </div>
            }
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" disabled={sender != 0 && receiver != 0 ? false:true} onClick={downloadXml}>Download</Button>
          </Modal.Footer>
      </Modal>

      <ToastContainer className="p-3 m-5" position="top-center" style={{ zIndex: 9999 }}>
        <Toast bg={(toastMsg.type).toLowerCase()} onClose={() => setToastShow(false)} show={toastShow} delay={3000} autohide>
          <Toast.Header closeButton={false}>
            {/* {loader()} */}
            <strong className="me-auto">
              {
                (() => {
                  switch(toastMsg.type) {
                    case "Success":
                      return "Success";
                      break;
                    case "Danger":
                      return "Error";
                      break;
                    case "Warning":
                      return "Warning";
                      break;
                    case "Info":
                      return "Info";
                      break;
                  }
                })()
              }
            </strong>
            <small></small>
          </Toast.Header>
          <Toast.Body className="text-white">
            {
              toastMsg.message
            }
          </Toast.Body>
        </Toast>
      </ToastContainer>
    </Fragment>
  );
};

Canvas.propTypes = {
  height: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
};

export default Canvas;
