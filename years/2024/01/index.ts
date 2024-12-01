import _, { first } from "lodash";
import * as util from "../../../util/util";
import * as test from "../../../util/test";
import chalk from "chalk";
import { log, logSolution, trace } from "../../../util/log";
import { performance } from "perf_hooks";

const YEAR = 2024;
const DAY = 1;

// problem url  : https://adventofcode.com/2024/day/1

async function p2024day1_part1(input: string, ...params: any[]) {
	const lines = input.split("\n");

	let a_list: number[] = [];
	let b_list: number[] = [];

	for (const line of lines) {
		const [a, b] = line.split("   ");
		a_list.push(parseInt(a));
		b_list.push(parseInt(b));
	}

	a_list.sort((a, b) => a - b);
	b_list.sort((a, b) => a - b);

	let totalDifference = 0;
	for (let i = 0; i < a_list.length; i++) {
		totalDifference += Math.abs(a_list[i] - b_list[i]);
	}

	return totalDifference;
}

async function p2024day1_part2(input: string, ...params: any[]) {
	const lines = input.split("\n");

	let a_list: number[] = [];
	let b_dict: { [key: string]: number } = {};

	for (const line of lines) {
		const [a, b] = line.split("   ");
		a_list.push(parseInt(a));

		const b_int = parseInt(b);
		const current_count = b_dict[`${b_int}`] ?? 0;
		b_dict[`${b_int}`] = current_count + 1;
	}

	a_list.sort((a, b) => a - b);

	let totalSimilarity = 0;
	for (let i = 0; i < a_list.length; i++) {
		const count_in_b_list = b_dict[`${a_list[i]}`] ?? 0;
		totalSimilarity += Math.abs(a_list[i] * count_in_b_list);
	}

	return totalSimilarity;
}

async function run() {
	const part1tests: TestCase[] = [
		{
			input: `3   4
4   3
2   5
1   3
3   9
3   3`,
			extraArgs: [],
			expected: `11`,
		},
	];
	const part2tests: TestCase[] = [
		{
			input: `3   4
4   3
2   5
1   3
3   9
3   3`,
			extraArgs: [],
			expected: `31`,
		},
	];

	// Run tests
	test.beginTests();
	await test.section(async () => {
		for (const testCase of part1tests) {
			test.logTestResult(testCase, String(await p2024day1_part1(testCase.input, ...(testCase.extraArgs || []))));
		}
	});
	await test.section(async () => {
		for (const testCase of part2tests) {
			test.logTestResult(testCase, String(await p2024day1_part2(testCase.input, ...(testCase.extraArgs || []))));
		}
	});
	test.endTests();

	// Get input and run program while measuring performance
	const input = await util.getInput(DAY, YEAR);

	const part1Before = performance.now();
	const part1Solution = String(await p2024day1_part1(input));
	const part1After = performance.now();

	const part2Before = performance.now();
	const part2Solution = String(await p2024day1_part2(input));
	const part2After = performance.now();

	logSolution(1, 2024, part1Solution, part2Solution);

	log(chalk.gray("--- Performance ---"));
	log(chalk.gray(`Part 1: ${util.formatTime(part1After - part1Before)}`));
	log(chalk.gray(`Part 2: ${util.formatTime(part2After - part2Before)}`));
	log();
}

run()
	.then(() => {
		process.exit();
	})
	.catch(error => {
		throw error;
	});