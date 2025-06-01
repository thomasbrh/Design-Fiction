'use strict'; // Attention de bien mettre type="module" dans la balise script du html

import './slider.js';
import './data.js';
import './navigation.js';
import './breakpoints.js';

/* Import animation */
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);
import './animations.js';